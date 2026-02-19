import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Link from '@mui/material/Link';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';

// import { _mock } from 'src/_mock';
import Logo from 'src/components/logo';
import { bgBlur } from 'src/theme/css';
import { paths } from 'src/routes/paths';
// import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useCartStore } from 'src/states/cart';
import { RouterLink } from 'src/routes/components';
import { useUserStore } from 'src/states/auth-store';
import { useWishlistStore } from 'src/states/wishlist';
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';

import { HEADER } from '../config-layout';
// import Searchbar from '../common/searchbar';
import HeaderShadow from '../common/header-shadow';
// import SettingsButton from '../common/settings-button';

import NavMobile from './nav/mobile';
import NavDesktop from './nav/desktop';
import { navConfig } from './config-navigation';

// ----------------------------------------------------------------------

const navigations = [
  {
    title: 'Personal Info',
    path: paths.eLearning.account.personal,
    icon: <Iconify icon="carbon:user" />,
  },
  {
    title: 'Wishlist',
    path: paths.eLearning.account.wishlist,
    icon: <Iconify icon="carbon:favorite" />,
  },
  {
    title: 'My Learning',
    path: paths.eLearning.account.myLearning,
    icon: <Iconify icon="fluent-mdl2:publish-course" />,
  },
  {
    title: 'Certificates',
    path: paths.eLearning.account.vouchers,
    icon: <Iconify icon="carbon:certificate" />,
  },
  {
    title: 'Orders',
    path: paths.eLearning.account.orders,
    icon: <Iconify icon="carbon:document" />,
  },
];

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
  // const [user, updateUser] = useUserStore((state) => [state.user, state.updateUser]);
  const userData = useUserStore();
  // const removeUserData = useUserStore();

  const { isLoggedIn, image } = userData.UserData;

  const cart = useCartStore((state) => state.cart);

  const wishlist = useWishlistStore((state) => state.wishlist);

  const theme = useTheme();

  const offset = useOffSetTop();

  const mdUp = useResponsive('up', 'md');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
            <Link component={RouterLink} href={paths.eLearning.account.wishlist}>
              <IconButton size="small" sx={{ p: 1.2 }}>
                <Badge
                  badgeContent={wishlist.length > 99 ? '99+' : wishlist.length}
                  color="primary"
                >
                  <Iconify icon="solar:heart-linear" width={24} />
                </Badge>
              </IconButton>
            </Link>

            <Link component={RouterLink} href={paths.eLearning.cart}>
              <IconButton size="small" sx={{ p: 1.2 }}>
                <Badge badgeContent={cart.length > 99 ? '99+' : cart.length} color="primary">
                  <Iconify icon="carbon:shopping-cart" width={24} />
                </Badge>
              </IconButton>
            </Link>

            {mdUp && (
              <>
                {isLoggedIn ? (
                  <>
                    {/* <Link component={RouterLink} href={paths.eLearning.account.personal}> */}
                    <Tooltip title="Account settings">
                      <Avatar
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        src={image}
                        sx={{ width: 40, height: 40, cursor: 'pointer' }}
                      />
                    </Tooltip>
                    <Menu
                      anchorEl={anchorEl}
                      id="account-menu"
                      open={open}
                      onClose={handleClose}
                      onClick={handleClose}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          overflow: 'visible',
                          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                          mt: 1.5,
                          padding: 2,
                          width: 250,
                          '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                      <Link
                        sx={{ color: 'black' }}
                        component={RouterLink}
                        href={paths.eLearning.account.personal}
                        underline="none"
                      >
                        <MenuItem onClick={handleClose}>
                          <Avatar src={image} />
                          {userData.UserData.username}
                        </MenuItem>
                      </Link>
                      <Divider sx={{ my: 1 }} />
                      {navigations.map(({ title, path, icon }) => (
                        <Link
                          sx={{ color: 'black' }}
                          component={RouterLink}
                          href={path}
                          underline="none"
                        >
                          <MenuItem onClick={handleClose}>
                            <ListItemIcon sx={{ mr: 0 }}>{icon}</ListItemIcon>
                            {title}
                          </MenuItem>
                        </Link>
                      ))}
                      <Divider sx={{ my: 1 }} />
                      <MenuItem
                        onClick={() => {
                          handleClose();
                          userData.removeUserData();
                        }}
                      >
                        <ListItemIcon sx={{ mr: 0 }}>
                          <Iconify icon="material-symbols:logout" />
                        </ListItemIcon>
                        Logout
                      </MenuItem>
                    </Menu>
                    {/* <Menu
                      id="demo-positioned-menu"
                      sx={{ mx: 'auto', mt: 1 }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <Link
                        sx={{ color: 'black' }}
                        component={RouterLink}
                        href={paths.eLearning.account.personal}
                      >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                      </Link>
                      <Link sx={{ color: 'black' }}>
                        <MenuItem onClick={() => userData.removeUserData()}>Logout</MenuItem>
                      </Link>
                    </Menu> */}
                    {/* </Link> */}
                    {/* <Button variant="contained" color="error" onClick={() => removeUserData()}>
                      logout
                    </Button> */}
                  </>
                ) : (
                  <div className="flex gap-4">
                    <Link component={RouterLink} href={paths.loginBackground}>
                      <Button variant="contained" color="secondary">
                        Training Login
                      </Button>
                    </Link>
                  </div>
                )}
              </>
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
