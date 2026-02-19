import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import { Link } from '@mui/material';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Image from 'src/components/image';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export function bgGradient(props) {
  const direction = props?.direction || 'to bottom';
  const startColor = props?.startColor;
  const endColor = props?.endColor;
  // const imgUrl = props?.imgUrl;
  // const color = props?.color;

  // if (imgUrl) {
  //   return {
  //     background: `linear-gradient(${direction}, ${startColor || color}, ${
  //       endColor || color
  //     }), url(${imgUrl})`,
  //     backgroundSize: 'cover',
  //     backgroundRepeat: 'no-repeat',
  //     backgroundPosition: 'center center',
  //   };
  // }

  return {
    background: `linear-gradient(${direction}, ${startColor}, ${endColor})`,
  };
}

export default function ElearningAboutHero({ title, description_one, description_two }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: { xs: 10, md: 10 },
        overflow: 'hidden',
        // bgcolor: 'primary.lighter',
        // ...bgGradient({
        //   endColor: '#FFCEBD',
        //   startColor: '#f7f5f4',
        //   color: alpha(theme.palette.background.default, 0.1),
        //   // imgUrl: '/assets/background/overlay_3.jpg',
        // }),
      }}
    >
      <Container>
        <Grid container spacing={{ xs: 8, md: 3 }} justifyContent="space-between">
          <Grid
            xs={12}
            md={6}
            lg={5}
            sx={{
              color: 'grey.800',
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Typography variant="h1">{title}</Typography>

            <Typography sx={{ mt: 3, mb: 2 }}>
              {/* Ryzolve is the education division of Ryzolve LLC. One of the pioneers in providing
              consultancy services to HCSSA agencies. */}
              {description_one}
            </Typography>
            <Typography sx={{ mt: 3, mb: 6 }}>
              {/* The courses that we have for Administrators and Alternate Administrators of Home
              Health, Hospice and Personal Care Services have been created in an easy to study
              method for the convenience and comfort of students. */}
              {description_two}
            </Typography>

            {/* <Button variant="contained" size="large" color="primary">
              Browse Courses
            </Button> */}
            <Link component={RouterLink} href={paths.eLearning.courses}>
              <Button color="secondary" size="large" variant="contained">
                Start Learning
              </Button>
            </Link>
          </Grid>

          <Grid xs={12} md={6} lg={6}>
            <Image alt="courses-online" src="/assets/illustrations/illustration_courses_hero.svg" />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

ElearningAboutHero.propTypes = {
  title: PropTypes.string,
  description_one: PropTypes.string,
  description_two: PropTypes.string,
};
