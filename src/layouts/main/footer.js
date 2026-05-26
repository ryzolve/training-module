import PropTypes from 'prop-types';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import Button, { buttonClasses } from '@mui/material/Button';

import { _socials } from 'src/_mock';
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { usePathname } from 'src/routes/hooks';
import { useBoolean } from 'src/hooks/use-boolean';
import { RouterLink } from 'src/routes/components';
import { axiosClient } from 'src/utils/axiosClient';
import { useResponsive } from 'src/hooks/use-responsive';

import { pageLinks, navConfig } from './config-navigation';

// ----------------------------------------------------------------------

const StyledAppStoreButton = styled(Button)(({ theme }) => ({
  flexShrink: 0,
  padding: '5px 12px',
  color: theme.palette.common.white,
  border: `solid 1px ${alpha(theme.palette.common.black, 0.24)}`,
  background: `linear-gradient(180deg, ${theme.palette.grey[900]} 0%, ${theme.palette.common.black} 100%)`,
  [`& .${buttonClasses.startIcon}`]: {
    marginLeft: 0,
  },
}));

// ----------------------------------------------------------------------

export default function Footer() {
  const mdUp = useResponsive('up', 'md');

  const socialLinks = () => {
    const response = axiosClient.get('/api/social-media-links');
    return response;
  };

  // const { data, isLoading } = useQuery({
  //   queryKey: ['socal'],
  //   queryFn: socialLinks,
  // });

  const year = new Date();

  const pathname = usePathname();

  const mobileList = navConfig.find((i) => i.title === 'Pages')?.children || [];

  const desktopList = pageLinks.sort((listA, listB) => Number(listA.order) - Number(listB.order));

  const feturedLinks = [
    { title: 'Home', path: '/' },
    // /courses is 308-redirected to learn.ryzolve.app — point at the kept
    // marketing catalog at /e-learning/courses instead.
    { title: 'Courses', path: '/e-learning/courses' },
    { title: 'About Us', path: '/about-us' },
    { title: 'Ryzolve', path: 'https://s.ryzolve.com/' },
  ];

  const renderLists = mdUp ? desktopList : mobileList;

  const isHome = pathname === '/';

  // const simpleFooter = (
  //   <Container sx={{ py: 8, textAlign: 'center' }}>
  //     <Logo single />

  //     <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
  //       © 2023. All rights reserved
  //     </Typography>
  //   </Container>
  // );

  const mainFooter = (
    <>
      <Divider />

      <Container
        sx={{
          overflow: 'hidden',
          py: { xs: 8, md: 10 },
        }}
      >
        <Grid container spacing={6} justifyContent={{ md: 'space-between' }}>
          <Grid xs={12} md={4}>
            <Stack spacing={{ xs: 3, md: 5 }}>
              <Stack alignItems="flex-start" spacing={3}>
                <Logo />

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  We are an online education platform that helps professional and aspiring
                  individuals to achieve their goals
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid md={2}>
            <Typography variant="h6">Featured Links</Typography>
            {feturedLinks.map((link) => (
              <Grid sx={{ mt: 1 }}>
                <Link
                  component={RouterLink}
                  key={link.title}
                  href={link.path}
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 'fontWeightSemiBold',

                    '&:hover': {
                      color: 'text.primary',
                    },
                  }}
                >
                  {link.title}
                </Link>
              </Grid>
            ))}
          </Grid>
          <Grid xs={12} md={3}>
            <Stack spacing={1} alignItems="flex-start">
              <Typography variant="h6">Contact</Typography>
              <Link variant="body2" sx={{ color: 'text.primary' }}>
                Ryzolve LLC, 9309 State Highway 75S, New Waverly TX, 77358
              </Link>

              <Link variant="body2" sx={{ color: 'text.primary' }}>
                (936) 355-9490
              </Link>

              <Link variant="body2" sx={{ color: 'text.primary' }}>
                care@ryzolve.com
              </Link>
            </Stack>
            <Stack spacing={2} sx={{ mt: 8 }}>
              <Stack spacing={2}>
                <Typography variant="h6">Social</Typography>
                <Stack direction="row" alignItems="center">
                  {_socials.map((social) => (
                    <IconButton href={social.link} key={social.value} color="secondary">
                      <Iconify icon={social.icon} />
                    </IconButton>
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Divider />

      <Container>
        <Stack
          spacing={2.5}
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          sx={{ py: 3, textAlign: 'center' }}
        >
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            © {year.getFullYear()}. All rights reserved
          </Typography>

          <Stack direction="row" spacing={3} justifyContent="center">
            <Link variant="caption" sx={{ color: 'text.secondary' }}>
              Help Center
            </Link>

            <Link variant="caption" sx={{ color: 'text.secondary' }}>
              Terms of Service
            </Link>
          </Stack>
        </Stack>
      </Container>
    </>
  );

  return <footer>{mainFooter}</footer>;

  // return <footer>{simpleFooter}</footer>;
}

// ----------------------------------------------------------------------

export function ListDesktop({ list }) {
  const pathname = usePathname();

  return (
    <Stack spacing={1.5} alignItems="flex-start">
      <Typography variant="subtitle2">{list.subheader}</Typography>

      {list.items?.map((link) => {
        const active = pathname === link.path || pathname === `${link.path}/`;

        return (
          <Link
            component={RouterLink}
            key={link.title}
            href={link.path}
            variant="caption"
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'text.primary',
              },
              ...(active && {
                color: 'text.primary',
                fontWeight: 'fontWeightSemiBold',
              }),
            }}
          >
            {link.title}
          </Link>
        );
      })}
    </Stack>
  );
}

ListDesktop.propTypes = {
  list: PropTypes.shape({
    items: PropTypes.array,
    subheader: PropTypes.string,
  }),
};

// ----------------------------------------------------------------------

export function ListMobile({ list }) {
  const pathname = usePathname();

  const listExpand = useBoolean();

  return (
    <Stack spacing={1.5} alignItems="flex-start">
      <Typography
        variant="subtitle2"
        onClick={listExpand.onToggle}
        sx={{
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        {list.subheader}
        <Iconify
          width={16}
          icon={listExpand.value ? 'carbon:chevron-down' : 'carbon:chevron-right'}
          sx={{ ml: 0.5 }}
        />
      </Typography>

      <Collapse in={listExpand.value} unmountOnExit sx={{ width: 1 }}>
        <Stack spacing={1.5} alignItems="flex-start">
          {list.items?.map((link) => (
            <Link
              component={RouterLink}
              key={link.title}
              href={link.path}
              variant="caption"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'text.primary',
                },
                ...(pathname === `${link.path}/` && {
                  color: 'text.primary',
                  fontWeight: 'fontWeightSemiBold',
                }),
              }}
            >
              {link.title}
            </Link>
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
}

ListMobile.propTypes = {
  list: PropTypes.shape({
    items: PropTypes.array,
    subheader: PropTypes.string,
  }),
};

// ----------------------------------------------------------------------

// function AppStoreButton({ ...other }) {
//   return (
//     <Stack direction="row" flexWrap="wrap" spacing={2} {...other}>
//       <StyledAppStoreButton startIcon={<Iconify icon="ri:apple-fill" width={28} />}>
//         <Stack alignItems="flex-start">
//           <Typography variant="caption" sx={{ opacity: 0.72 }}>
//             Download on the
//           </Typography>

//           <Typography variant="h6" sx={{ mt: -0.5 }}>
//             Apple Store
//           </Typography>
//         </Stack>
//       </StyledAppStoreButton>

//       <StyledAppStoreButton startIcon={<Iconify icon="logos:google-play-icon" width={28} />}>
//         <Stack alignItems="flex-start">
//           <Typography variant="caption" sx={{ opacity: 0.72 }}>
//             Download from
//           </Typography>

//           <Typography variant="h6" sx={{ mt: -0.5 }}>
//             Google Play
//           </Typography>
//         </Stack>
//       </StyledAppStoreButton>
//     </Stack>
//   );
// }

<Stack spacing={1} alignItems="flex-start">
  <Typography variant="h6">Contact</Typography>
  <Link variant="body2" sx={{ color: 'text.primary' }}>
    Ryzolve LLC, 9309 State Highway 75S, New Waverly TX, 77358
  </Link>

  <Link variant="body2" sx={{ color: 'text.primary' }}>
    (936) 355-9490
  </Link>

  <Link variant="body2" sx={{ color: 'text.primary' }}>
    care@ryzolve.com
  </Link>
</Stack>;
