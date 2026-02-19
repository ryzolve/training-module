import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { axiosClient } from 'src/utils/axiosClient';
import { fCurrency } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export default function ElearningCartSummary({
  total,
  taxPercent,
  subtotal,
  discountPercent,
  discount,
  isEmpty,
}) {
  const getTaxAndCoupons = async () => {
    const response = await axiosClient.get('/api/configuration?populate=*');
    const { tax } = response.data.data.attributes;

    setTaxs(tax);
    setTotalAmount((total * tax) / 100 + total);
  };

  useEffect(() => {
    getTaxAndCoupons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [coupon, setCoupon] = useState('');

  const [couponApply, setCouponApply] = useState(false);

  const [couponDiscount, setCouponDiscount] = useState('');

  const [couponMessage, setCouponMessage] = useState('');

  const [taxs, setTaxs] = useState('');

  const [totalAmount, setTotalAmount] = useState(0);

  const discountClick = async () => {
    const response = await axiosClient.get('/api/configuration?populate=*');
    const { coupons } = response.data.data.attributes;

    if (coupon === coupons.coupon && coupons.active) {
      setCouponDiscount(coupons.percentage);
      setCouponMessage('Coupon applyed success');
      localStorage.setItem('coupon', coupons.percentage);
      const Amount = totalAmount - (couponDiscount / 100) * totalAmount;
      setTotalAmount(Amount);
      setCouponApply(true);
    } else {
      setCouponDiscount(0);
      setCouponMessage('Coupon not active');
    }
  };

  return (
    <Stack
      spacing={3}
      sx={{
        p: 5,
        borderRadius: 2,
        border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
      }}
    >
      <Typography variant="h6"> Summary </Typography>

      <Stack spacing={2}>
        <Row label="Subtotal" value={fCurrency(subtotal)} />

        {/* <Row label="Tax" value={`${taxs}%`} /> */}
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Row
        label="Total"
        value={fCurrency(totalAmount)}
        sx={{
          typography: 'h6',
          '& span': { typography: 'h6' },
        }}
      />

      <Button
        component={RouterLink}
        href={paths.eLearning.checkout}
        size="large"
        variant="contained"
        color="inherit"
        disabled={isEmpty}
      >
        Checkout
      </Button>
    </Stack>
  );
}

ElearningCartSummary.propTypes = {
  total: PropTypes.any,
  taxPercent: PropTypes.number,
  discount: PropTypes.number,
  discountPercent: PropTypes.number,
  subtotal: PropTypes.number,
  isEmpty: PropTypes.bool,
};

// ----------------------------------------------------------------------

function Row({ label, value, sx, ...other }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ typography: 'subtitle2', ...sx }}
      {...other}
    >
      <Box component="span" sx={{ typography: 'body2' }}>
        {label}
      </Box>
      {value}
    </Stack>
  );
}

Row.propTypes = {
  sx: PropTypes.object,
  label: PropTypes.string,
  value: PropTypes.string,
};
