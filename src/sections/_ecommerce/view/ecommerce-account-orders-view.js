'use client';

import { useQuery } from 'react-query';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { Link } from '@mui/material';
import Tabs from '@mui/material/Tabs';
// import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// import Switch from '@mui/material/Switch';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
// import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TablePagination from '@mui/material/TablePagination';
// import FormControlLabel from '@mui/material/FormControlLabel';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import { paths } from 'src/routes/paths';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';

// import { _productsTable } from 'src/_mock';
// import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { getOrdersData } from 'src/queries/orders';
import { useUserStore } from 'src/states/auth-store';

import { stableSort, getComparator } from '../account/utils';
import EcommerceAccountOrdersTableRow from '../account/ecommerce-account-orders-table-row';
import EcommerceAccountOrdersTableHead from '../account/ecommerce-account-orders-table-head';
import EcommerceAccountOrdersTableToolbar from '../account/ecommerce-account-orders-table-toolbar';

// ----------------------------------------------------------------------

const TABS = ['All Orders', 'Completed', 'To Process', 'Cancelled', 'Return & Refund'];

export const TABLE_HEAD = [
  { id: 'orderId', label: 'Order ID' },
  { id: 'item', label: 'Item' },
  { id: 'deliveryDate', label: 'Delivery date', width: 160 },
  { id: 'price', label: 'Price', width: 100 },
  { id: 'status', label: 'Status', width: 100 },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function EcommerceAccountOrdersPage() {
  const [tab, setTab] = useState('All Orders');

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('orderId');

  const [selected, setSelected] = useState([]);

  const [page, setPage] = useState(0);

  const [
    dense,
    // setDense
  ] = useState(false);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const userData = useUserStore((state) => state.UserData);

  const {
    data,
    // isLoading
  } = useQuery({
    queryKey: ['orders', userData.id],
    queryFn: getOrdersData,
    select: (ordersData) =>
      ordersData.filter((orderData) => userData.username === orderData.attributes.username),
  });

  const handleChangeTab = useCallback((event, newValue) => {
    setTab(newValue);
  }, []);

  const handleSort = useCallback(
    (id) => {
      const isAsc = orderBy === id && order === 'asc';
      if (id !== '') {
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(id);
      }
    },
    [order, orderBy]
  );

  const handleSelectAllRows = useCallback(
    (event) => {
      if (event.target.checked) {
        const newSelected = data.map((n) => n.id);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    },
    [data]
  );

  const handleSelectRow = useCallback(
    (id) => {
      const selectedIndex = selected.indexOf(id);
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }

      setSelected(newSelected);
    },
    [selected]
  );

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  // const handleChangeDense = useCallback((event) => {
  //   setDense(event.target.checked);
  // }, []);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    <>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Orders
      </Typography>

      {data?.length ? (
        <>
          <Tabs
            value={tab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={handleChangeTab}
          >
            {TABS.map((category) => (
              <Tab key={category} value={category} label={category} />
            ))}
          </Tabs>
          <TableContainer
            sx={{
              overflow: 'unset',
              [`& .${tableCellClasses.head}`]: {
                color: 'text.primary',
              },
              [`& .${tableCellClasses.root}`]: {
                bgcolor: 'background.default',
                borderBottomColor: (theme) => theme.palette.divider,
              },
            }}
          >
            <EcommerceAccountOrdersTableToolbar
              rowCount={data?.length}
              numSelected={selected.length}
              onSelectAllRows={handleSelectAllRows}
            />

            <Scrollbar>
              <Table
                sx={{
                  minWidth: 720,
                }}
                size={dense ? 'small' : 'medium'}
              >
                <EcommerceAccountOrdersTableHead
                  order={order}
                  orderBy={orderBy}
                  onSort={handleSort}
                  headCells={TABLE_HEAD}
                  rowCount={data?.length}
                  numSelected={selected.length}
                  onSelectAllRows={handleSelectAllRows}
                />

                <TableBody>
                  {data &&
                    stableSort(data, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                        <EcommerceAccountOrdersTableRow
                          key={row.id}
                          row={row.attributes}
                          selected={selected.includes(row.id)}
                          onSelectRow={() => handleSelectRow(row.id)}
                        />
                      ))}

                  {emptyRows > 0 && (
                    <TableRow
                      sx={{
                        height: (dense ? 36 : 57) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={9} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>
          <Box sx={{ position: 'relative' }}>
            <TablePagination
              page={page}
              component="div"
              count={data ? data.length : 0}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </>
      ) : (
        <Stack
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            ml: { md: -2 },
            mt: { xs: 12, md: 4 },
          }}
        >
          <Image
            alt="Empty State My Learning"
            src="/assets/images/empty-states/empty-cart.png"
            sx={{
              height: { xs: 122, md: 300 },
              width: { xs: 160, md: 300 },
              objectFit: 'cover',
            }}
          />

          <Link component={RouterLink} href={paths.eLearning.courses} sx={{ pt: 6 }}>
            <Button
              sx={{ bgcolor: '#FF774B' }}
              size="large"
              variant="contained"
              startIcon={<Iconify icon="carbon:chevron-left" />}
            >
              Order now
            </Button>
          </Link>
        </Stack>
      )}
    </>
  );
}
