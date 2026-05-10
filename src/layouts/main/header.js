import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';

import Logo from 'src/components/logo';
import { bgBlur } from 'src/theme/css';
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';

import { HEADER } from '../config-layout';
import HeaderShadow from '../common/header-shadow';

import NavMobile from './nav/mobile';
import NavDesktop from './nav/desktop';
import { navConfig } from './config-navigation';

// ----------------------------------------------------------------------
// Cutover: this header is now stateless w/r/t auth, cart and wishlist —
// all of those concerns live on learn.ryzolve.app. The "Login" button
// is a plain anchor to the new platform's auth route.
// ----------------------------------------------------------------------

const NEW_PLATFORM_LOGIN_URL = 'https://learn.ryzolve.app/auth/login';

const defaultConfig = {
  itemGap: 4,
  iconSize: 24,
  itemRootHeight: 44,
  itemSubHeight: 36,
  itemPadding: '4px 8px 4px 12px',
  itemRadius: 8,
  hiddenLabel: false,
};

export default function Header({ headerOnDark }) {
  const theme = useTheme();

  const offset = useOffSetTop();

  const mdUp = useResponsive('up', 'md');

  return (
    <AppBar>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(['height', 'background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(headerOnDark && {
            color: 'common.white',
          }),
          ...(offset && {
            ...bgBlur({ color: theme.palette.background.default }),
            color: 'text.primary',
            height: {
              md: HEADER.H_DESKTOP - 16,
            },
          }),
        }}
      >
        <Container
          sx={{ height: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Box sx={{ lineHeight: 0, position: 'relative', width: '20%' }}>
            <Logo />
          </Box>

          {mdUp && <NavDesktop data={navConfig} config={defaultConfig} />}

          <Stack
            spacing={{ xs: 0, md: 4 }}
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
          >
            {mdUp && (
              <Link href={NEW_PLATFORM_LOGIN_URL}>
                <Button variant="contained" color="secondary">
                  Training Login
                </Button>
              </Link>
            )}

            {!mdUp && <NavMobile data={navConfig} />}
          </Stack>
        </Container>
      </Toolbar>

      {offset && <HeaderShadow />}
    </AppBar>
  );
}

Header.propTypes = {
  headerOnDark: PropTypes.bool,
};
