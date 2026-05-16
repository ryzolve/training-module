import { useQuery } from 'react-query';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { useResponsive } from 'src/hooks/use-responsive';
import { getPublicCoursesData } from 'src/queries/elearning-public';
import Carousel, { useCarousel, CarouselArrows } from 'src/components/carousel';

import ElearningPublicCourseItem from '../list/elearning-public-course-item';

// ----------------------------------------------------------------------

export default function ElearningLandingFeaturedCourses() {
  const { data } = useQuery({
    queryKey: ['public-courses', 'featured'],
    queryFn: getPublicCoursesData,
  });

  const theme = useTheme();

  const carousel = useCarousel({
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: theme.breakpoints.values.md,
        settings: { slidesToShow: 1 },
      },
    ],
  });

  const mdUp = useResponsive('up', 'md');

  return (
    <Box sx={{ bgcolor: 'background.neutral' }}>
      <Container
        sx={{
          pt: { xs: 3, md: 6 },
          pb: { xs: 0, md: 6 },
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ md: 'flex-end' }}
          sx={{
            textAlign: { xs: 'center', md: 'unset' },
          }}
        >
          <Stack spacing={3} flexGrow={1} sx={{ textAlign: 'center' }}>
            <Typography variant="h2">Featured courses</Typography>
          </Stack>

          {mdUp && <CarouselArrows spacing={2} onNext={carousel.onNext} onPrev={carousel.onPrev} />}
        </Stack>

        <Box
          sx={{
            position: 'relative',
            ml: { md: -2 },
            width: { md: 'calc(100% + 32px)' },
          }}
        >
          <CarouselArrows
            onNext={carousel.onNext}
            onPrev={carousel.onPrev}
            leftButtonProps={{
              sx: {
                left: -16,
                opacity: 1,
                color: 'common.white',
                bgcolor: 'primary.main',
                '&:hover': { bgcolor: 'primary.dark' },
                ...(mdUp && { display: 'none' }),
              },
            }}
            rightButtonProps={{
              sx: {
                right: -16,
                opacity: 1,
                color: 'common.white',
                bgcolor: 'primary.main',
                '&:hover': { bgcolor: 'primary.dark' },
                ...(mdUp && { display: 'none' }),
              },
            }}
          >
            <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
              {data?.map((course) => (
                <Box
                  key={course.id}
                  sx={{
                    px: 2,
                    pt: { xs: 6, md: 8 },
                    pb: { xs: 6, md: 8 },
                  }}
                >
                  <ElearningPublicCourseItem course={course} vertical />
                </Box>
              ))}
            </Carousel>
          </CarouselArrows>
        </Box>
      </Container>
    </Box>
  );
}
