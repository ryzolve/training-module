import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';


// ----------------------------------------------------------------------

const ROWS = [
  {
    label: 'Companies',
    total: 20,
    content: 'Praesent turpis. Praesent blandit laoreet nibh. Nunc nonummy metus.',
  },
  {
    label: 'Students',
    total: 32000,
    content: 'Praesent turpis. Praesent blandit laoreet nibh. Nunc nonummy metus.',
  },
  {
    label: 'years of experience',
    total: 20,
    content: 'Praesent turpis. Praesent blandit laoreet nibh. Nunc nonummy metus.',
  },
];

// ----------------------------------------------------------------------

export default function ElearningLandingAbout({ title, subtitle }) {
  return (
    <Box sx={{ bgcolor: 'background.neutral' }}>
      <Container
        sx={{
          py: { xs: 5, md: 10, width: '71%', textAlign: 'center' },
        }}
      >
        <Grid
          container
          columnSpacing={{ xs: 0, md: 3 }}
          rowSpacing={{ xs: 5, md: 0 }}
          // justifyContent="space-between"
        >
          <Grid
            xs={12}
            // md={5}
            sx={{
              textAlign: { xs: 'center', md: 'center' },
            }}
          >
            {/* <Typography component="div" variant="overline" sx={{ color: 'text.disabled' }}>
            About Us
          </Typography> */}

            <Typography variant="h2" sx={{ my: 3, textAlign: 'center' }}>
              {/* Who we are */}
              {title}
            </Typography>

            <Typography>
              {/* We are passionate about nursing education and committed to your success. Ryzolve is
              designed to provide you with the best learning experience. Whether you are an aspiring
              nurse or a seasoned professional, we have the resources and expertise to help you
              thrive in the field of nursing. */}
              {subtitle}
            </Typography>

            {/* <Button
            size="large"
            color="inherit"
            endIcon={<Iconify icon="carbon:chevron-right" />}
            sx={{ my: 5 }}
          >
            Lean more
          </Button> */}
          </Grid>

          {/* <Grid xs={12} md={6}>
          <Stack spacing={5}>
            {ROWS.map((row) => (
              <Stack
                key={row.label}
                direction="row"
                alignItems="center"
                divider={
                  <Divider
                    flexItem
                    orientation="vertical"
                    sx={{ ml: 3, mr: 5, borderStyle: 'dashed' }}
                  />
                }
              >
                <Stack spacing={1} sx={{ width: 1, maxWidth: 100 }}>
                  <Stack direction="row">
                    <Typography variant="h2">{fShortenNumber(row.total)}</Typography>
                    <Box component="span" sx={{ color: 'primary.main', typography: 'h4' }}>
                      +
                    </Box>
                  </Stack>

                  <Typography variant="overline" sx={{ color: 'text.disabled' }}>
                    {row.label}
                  </Typography>
                </Stack>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {row.content}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Grid> */}
        </Grid>
        {/* <Image
        alt="landing about"
        src="/assets/images/marketing/training-module-about.jpg"
        ratio="16/9"
        sx={{
          mt: 8,
          borderRadius: 1.5,
        }}
      /> */}
        {/* <Divider sx={{ borderStyle: 'dashed', mt: 8, mb: 1, bgcolor: 'primary.main' }} /> */}
      </Container>
    </Box>
  );
}

ElearningLandingAbout.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};
