import { useEffect } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { usePathname } from 'src/routes/hooks';
import Scrollbar from 'src/components/scrollbar';
import { useBoolean } from 'src/hooks/use-boolean';

import { NAV } from '../../../config-layout';

import NavList from './nav-list';

// ----------------------------------------------------------------------

const NEW_PLATFORM_LOGIN_URL = 'https://learn.ryzolve.app/auth/login';

export default function NavMobile({ data }) {
  const pathname = usePathname();

  const mobileOpen = useBoolean();

  useEffect(() => {
    if (mobileOpen.value) {
      mobileOpen.onFalse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <IconButton onClick={mobileOpen.onTrue} sx={{ ml: 1, color: 'inherit' }}>
        <Iconify icon="carbon:menu" />
      </IconButton>

      <Drawer
        open={mobileOpen.value}
        onClose={mobileOpen.onFalse}
        PaperProps={{
          sx: {
            pb: 5,
            width: NAV.W_VERTICAL,
          },
        }}
      >
        <Scrollbar>
          <Logo sx={{ mx: 2.5, my: 3 }} />

          <List component="nav" disablePadding>
            {data.map((link) => (
              <NavList key={link.title} item={link} navConfig={data} />
            ))}

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Link href={NEW_PLATFORM_LOGIN_URL} sx={{ width: '80%' }}>
                <Button fullWidth variant="contained" color="inherit">
                  Login
                </Button>
              </Link>
            </Box>
          </List>
        </Scrollbar>
      </Drawer>
    </>
  );
}

NavMobile.propTypes = {
  data: PropTypes.array,
};
