import { memo } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
// import { useTheme } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

function Logo({ single = false, sx }) {
  // const theme = useTheme();

  // const PRIMARY_MAIN = theme.palette.primary.main;

  const singleLogo = (
    <svg width="217" height="156" viewBox="0 0 217 156" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M216.457 46.4253H55.909L0.000976562 -3.79229e-05H160.548L216.457 46.4253Z" fill="#0D5992"/>
      <path d="M0.000488281 99.0439H160.548L216.456 46.4253H55.9098L0.000488281 99.0439Z" fill="#FF774C"/>
      <path d="M216.443 155.821H55.8947L0 99.044H160.548L216.443 155.821Z" fill="#0D5992"/>
    </svg>
  );

  const fullLogo = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <svg width="40" height="29" viewBox="0 0 217 156" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M216.457 46.4253H55.909L0.000976562 -3.79229e-05H160.548L216.457 46.4253Z" fill="#0D5992"/>
        <path d="M0.000488281 99.0439H160.548L216.456 46.4253H55.9098L0.000488281 99.0439Z" fill="#FF774C"/>
        <path d="M216.443 155.821H55.8947L0 99.044H160.548L216.443 155.821Z" fill="#0D5992"/>
      </svg>
      <span style={{ fontSize: 24, fontWeight: 700, color: '#0D5992', fontFamily: "'Manrope', sans-serif", letterSpacing: '-0.5px' }}>
        Ryzolve
      </span>
    </div>
  );

  return (
    <Link
      component={RouterLink}
      href={process.env.NEXT_PUBLIC_RYZOLVE_MAIN}
      color="inherit"
      aria-label="go to homepage"
      sx={{ lineHeight: 0 }}
    >
      <Box
        sx={{
          width: single ? 64 : 200,
          lineHeight: 0,
          cursor: 'pointer',
          display: 'inline-flex',
          ...sx,
        }}
      >
        {single ? singleLogo : fullLogo}
      </Box>
    </Link>
  );
}

Logo.propTypes = {
  single: PropTypes.bool,
  sx: PropTypes.object,
};

export default memo(Logo);
