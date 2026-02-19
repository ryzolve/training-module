'use client';

// eslint-disable-next-line import/no-extraneous-dependencies
import { useQuery } from 'react-query';
import {
  useState,
  // useEffect
} from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// import { _courses } from 'src/_mock';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { getCoursesData } from 'src/queries/courses';
import { SplashScreen } from 'src/components/loading-screen';

import ElearningNewsletter from '../elearning-newsletter';
import ElearningCourseList from '../list/elearning-course-list';

// ----------------------------------------------------------------------

export default function ElearningCoursesView() {
  const mobileOpen = useBoolean();

  // const loading = useBoolean(true);

  const [filters, setFilters] = useState({
    text: '',
    rating: null,
    duration: [],
    category: [],
    fee: [],
  });

  const { data, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: getCoursesData,
  });

  // const categories = data?.map((course) => course.attributes.category);

  // console.log('data', data);

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
          {/* <ElearningFilters
            open={mobileOpen.value}
            onClose={mobileOpen.onFalse}
            filters={filters}
            setFilters={setFilters}
          /> */}

          <Box
            sx={{
              flexGrow: 1,
              pb: 6,
              width: { md: `calc(100% - ${280}px)` },
            }}
          >
            <ElearningCourseList courses={data} loading={isLoading} filters={filters} />
          </Box>
        </Stack>
      </Container>

      <ElearningNewsletter />
    </>
  );
}
