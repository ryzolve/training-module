// import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
// import { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { axiosClient } from 'src/utils/axiosClient';
import { useUserStore } from 'src/states/auth-store';
import { SplashScreen } from 'src/components/loading-screen';
import ElearningCourseItem from 'src/sections/_elearning/list/elearning-course-item';

// ----------------------------------------------------------------------

export default function ElearningLandingFeaturedCourses() {
  const userData = useUserStore((state) => state.UserData);

  const { isLoading, data } = useQuery(['repoData', userData.id], () =>
    axiosClient.get('/api/user-courses', {
      headers: {
        Authorization: `Bearer ${userData.authToken}`,
      },
    })
  );



  if (isLoading) return <SplashScreen />;
  return (
    <Container
      sx={{
        pt: { xs: 5, md: 10 },
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ md: 'flex-end' }}
        sx={{
          textAlign: { xs: 'center', md: 'unset' },
        }}
      >
        <Stack spacing={3} flexGrow={1}>
          <Typography variant="h2">My Courses</Typography>
        </Stack>
      </Stack>

      <Grid
        container
        spacing={2}
        sx={{
          position: 'relative',
          ml: { md: -2 },
          mt: 5,
        }}
      >
        {data &&
          data.map((course) => (
            <Grid
              item
              md={6}
              lg={4}
              key={course.id}
              sx={{
                px: 2,
                pt: { xs: 8, md: 15 },
              }}
            >
              <ElearningCourseItem course={course} id={course.id} vertical />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
