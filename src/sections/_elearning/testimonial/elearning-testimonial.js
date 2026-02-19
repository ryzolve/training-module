import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { getTestimonialData } from 'src/queries/testimonials/index';
import Carousel, { useCarousel, CarouselArrows } from 'src/components/carousel';

import { TestimonialItemContent } from './testimonial-item';

// ----------------------------------------------------------------------

export default function ElearningTestimonial() {
  const theme = useTheme();

  const { data: testimonials, isLoading } = useQuery(['testimonialData'], () =>
    getTestimonialData()
  );

  const carouselLarge = useCarousel({
    slidesToShow: 1,
    draggable: false,
    slidesToScroll: 1,
    adaptiveHeight: true,
  });

  const carouselThumb = useCarousel({
    autoplay: true,
    slidesToShow: 5,
    centerMode: true,
    swipeToSlide: true,
    autoplaySpeed: 3000,
    focusOnSelect: true,
    centerPadding: '0px',
    rtl: Boolean(theme.direction === 'rtl'),

    responsive: [
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  });

  useEffect(() => {
    carouselLarge.onSetNav();
    carouselThumb.onSetNav();
  }, [carouselLarge, carouselThumb]);

  return (
    <Box
      sx={{
        textAlign: 'center',
        overflow: 'hidden',
        py: { xs: 4, md: 6 },
        mt: { xs: 4, md: 5 },
      }}
    >
      <Container sx={{ position: 'relative' }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid md={6}>
            <Typography variant="h2" sx={{ mb: 5 }}>
              What our customer say
            </Typography>

            <CarouselArrows
              onNext={carouselThumb.onNext}
              onPrev={carouselThumb.onPrev}
              leftButtonProps={{
                sx: { display: { xs: 'none', md: 'inline-flex' } },
              }}
              rightButtonProps={{
                sx: { display: { xs: 'none', md: 'inline-flex' } },
              }}
            >
              <Carousel
                {...carouselLarge.carouselSettings}
                asNavFor={carouselThumb.nav}
                ref={carouselLarge.carouselRef}
              >
                {testimonials?.map((testimonial) => (
                  <TestimonialItemContent
                    key={testimonial.attributes.review}
                    testimonial={testimonial.attributes}
                  />
                ))}
              </Carousel>

              <Box sx={{ mb: 0, mx: 'auto', maxWidth: { xs: 360, sm: 420 } }}>
                <Carousel
                  {...carouselThumb.carouselSettings}
                  asNavFor={carouselLarge.nav}
                  ref={carouselThumb.carouselRef}
                >
                  {/* {testimonials?.map((testimonial, index) => (
                    <TestimonialItemThumbnail
                      key={testimonial.attributes.review}
                      testimonial={testimonial.attributes}
                      selected={carouselLarge.currentIndex === index}
                    />
                  ))} */}
                </Carousel>
              </Box>
            </CarouselArrows>

            {testimonials?.map(
              (testimonial, index) =>
                carouselLarge.currentIndex === index && (
                  <Stack key={testimonial.attributes.review} spacing={0.5}>
                    <Typography variant="h6">{testimonial.attributes.name}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {testimonial.attributes.company} , {testimonial.attributes.designation}
                    </Typography>
                  </Stack>
                )
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

ElearningTestimonial.propTypes = {
  testimonials: PropTypes.array,
};
