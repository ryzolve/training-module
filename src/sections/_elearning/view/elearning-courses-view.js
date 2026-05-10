'use client';

import { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useQuery } from 'react-query';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { SplashScreen } from 'src/components/loading-screen';
import { getPublicCoursesData } from 'src/queries/elearning-public';

import ElearningNewsletter from '../elearning-newsletter';
import ElearningPublicCourseList from '../list/elearning-public-course-list';

// ----------------------------------------------------------------------

export default function ElearningCoursesView() {
  const mobileOpen = useBoolean();

  const [filters] = useState({
    text: '',
    rating: null,
    duration: [],
    category: [],
    fee: [],
  });

  // Now hits the new platform's public catalog API (api.ryzolve.app).
  const { data, isLoading } = useQuery({
    queryKey: ['public-courses'],
    queryFn: getPublicCoursesData,
  });

  if (isLoading) return <SplashScreen />;

  return (
    <>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            py: 5,
          }}
        >
          <Typography variant="h2">Courses</Typography>

          <Button
            color="inherit"
            variant="contained"
            startIcon={<Iconify icon="carbon:filter" width={18} />}
            onClick={mobileOpen.onTrue}
            sx={{
              display: { md: 'none' },
            }}
          >
            Filters
          </Button>
        </Stack>

        <Stack direction={{ xs: 'column', md: 'row' }}>
          <Box
            sx={{
              flexGrow: 1,
              pb: 6,
              width: { md: `calc(100% - ${280}px)` },
            }}
          >
            <ElearningPublicCourseList courses={data} loading={isLoading} filters={filters} />
          </Box>
        </Stack>
      </Container>

      <ElearningNewsletter />
    </>
  );
}
