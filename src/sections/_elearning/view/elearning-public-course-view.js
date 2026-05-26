'use client';

import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useQuery } from 'react-query';
import { useSearchParams } from 'next/navigation';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Image from 'src/components/image';
import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { fCurrency } from 'src/utils/format-number';
import { useResponsive } from 'src/hooks/use-responsive';
import { SplashScreen } from 'src/components/loading-screen';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { getPublicCourseData, getNewPlatformCourseUrl } from 'src/queries/elearning-public';

import ElearningNewsletter from '../elearning-newsletter';

// ----------------------------------------------------------------------
// Public detail view for the kept marketing surface.
//
// Reads ?slug= from the URL, fetches from api.ryzolve.app, and renders a
// pared-down hero+sidebar layout. The legacy detail page rendered a full
// learning UI (units, lessons, quizzes) — those are gone from this surface;
// the "Buy now" CTA bounces users to learn.ryzolve.app where the full
// learning experience lives.
// ----------------------------------------------------------------------

export default function ElearningPublicCourseView() {
  const mdUp = useResponsive('up', 'md');
  const searchParams = useSearchParams();

  const slug = searchParams.get('slug');

  const { data, isLoading } = useQuery({
    queryKey: ['public-course', slug],
    queryFn: () => getPublicCourseData(slug),
    enabled: !!slug,
  });

  if (!slug) {
    return (
      <Container sx={{ py: 10 }}>
        <Typography variant="h4">Course not found</Typography>
        <Typography sx={{ mt: 2 }}>
          Browse the{' '}
          <Link href={paths.eLearning.courses} color="primary">
            full catalog
          </Link>{' '}
          to find a course.
        </Typography>
      </Container>
    );
  }

  if (isLoading) return <SplashScreen />;

  if (!data) {
    return (
      <Container sx={{ py: 10 }}>
        <Typography variant="h4">Course not found</Typography>
        <Typography sx={{ mt: 2 }}>
          That course doesn&apos;t exist or has been moved. Browse the{' '}
          <Link href={paths.eLearning.courses} color="primary">
            full catalog
          </Link>{' '}
          to find what you&apos;re looking for.
        </Typography>
      </Container>
    );
  }

  const course = data.attributes;
  const buyHref = getNewPlatformCourseUrl(course.slug, {
    autoBuy: true,
    catalogType: course.catalogType,
  });
  const isAgencyBundle = course.catalogType === 'agency_bundle';

  return (
    <>
      <Box
        sx={{
          bgcolor: 'background.neutral',
          pb: { xs: 5, md: 10 },
        }}
      >
        <Container sx={{ overflow: 'hidden' }}>
          <CustomBreadcrumbs
            links={[
              { name: 'Home', href: '/' },
              { name: 'Courses', href: paths.eLearning.courses },
              { name: course.title || '' },
            ]}
            sx={{
              pt: 5,
              mb: { xs: 5, md: 10 },
            }}
          />

          <Grid container spacing={{ xs: 5, md: 6 }} direction="row-reverse">
            <Grid xs={12} md={5}>
              <Stack
                alignItems="center"
                justifyContent="center"
                gap={3}
                sx={{
                  position: 'relative',
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <Image
                  ratio="4/3"
                  alt={course.title}
                  src={course.image || '/assets/images/course/course_hero.svg'}
                  sx={{ width: '100%', bgcolor: 'background.neutral' }}
                />
              </Stack>
            </Grid>

            <Grid xs={12} md={7}>
              <Stack spacing={3}>
                <Stack spacing={2} alignItems="flex-start">
                  <Typography variant="h3" component="h1">
                    {course.title}
                  </Typography>

                  <Typography variant="subtitle1">{course.description}</Typography>
                </Stack>

                {course.WhatYouWillLearn?.length > 0 && (
                  <Stack spacing={3}>
                    <Typography variant="h4">What You Will Learn</Typography>
                    <Stack spacing={1}>
                      {course.WhatYouWillLearn.map((learn) => (
                        <Stack key={learn.id} direction="row" alignItems="center">
                          <Box
                            sx={{
                              mr: 1.5,
                              width: 20,
                              height: 20,
                              display: 'flex',
                              borderRadius: '50%',
                              alignItems: 'center',
                              justifyContent: 'center',
                              bgcolor: (theme) => alpha(theme?.palette?.primary?.main, 0.08),
                            }}
                          >
                            <Iconify
                              icon="carbon:checkmark"
                              sx={{ width: 16, height: 16, color: 'primary.main' }}
                            />
                          </Box>
                          <Typography variant="subtitle2">{learn.points}</Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Stack>
                )}

                <Divider sx={{ borderStyle: 'dashed' }} />

                <Stack spacing={2}>
                  <Stack
                    direction="row"
                    flexWrap="wrap"
                    sx={{
                      '& > *': { my: 0.5, mr: 3 },
                    }}
                  >
                    {course.time > 0 && (
                      <Stack direction="row" alignItems="center" sx={{ typography: 'subtitle2' }}>
                        <Iconify icon="carbon:time" sx={{ mr: 1 }} /> {`${course.time} Hours`}
                      </Stack>
                    )}

                    {course.courseCount > 0 && (
                      <Stack direction="row" alignItems="center" sx={{ typography: 'subtitle2' }}>
                        <Iconify icon="carbon:book" sx={{ mr: 1 }} />
                        {`${course.courseCount} included courses`}
                      </Stack>
                    )}

                    <Stack direction="row" sx={{ typography: 'subtitle2' }}>
                      <Iconify icon="carbon:certificate" sx={{ mr: 1 }} />
                      <span>Certificate of completion</span>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container
        sx={{
          overflow: 'hidden',
          pt: { xs: 5, md: 10 },
          pb: { xs: 15, md: 10 },
        }}
      >
        <Grid container spacing={{ xs: 5, md: 8 }}>
          {!mdUp && (
            <Grid xs={12}>
              <BuyCard course={course} buyHref={buyHref} isAgencyBundle={isAgencyBundle} />
            </Grid>
          )}

          <Grid xs={12} md={7} lg={8}>
            <Stack spacing={5}>
              {course.Skills?.length > 0 && (
                <Stack spacing={3}>
                  <Typography variant="h4">Skills You Will Gain</Typography>

                  <Stack direction="row" flexWrap="wrap" spacing={1}>
                    {course.Skills.map((skill) => (
                      <Chip key={skill.id} label={skill.points} size="small" variant="soft" />
                    ))}
                  </Stack>
                </Stack>
              )}
            </Stack>
          </Grid>

          <Grid xs={12} md={5} lg={4}>
            <Stack spacing={5}>
              {mdUp && (
                <BuyCard course={course} buyHref={buyHref} isAgencyBundle={isAgencyBundle} />
              )}
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <ElearningNewsletter />
    </>
  );
}

// ----------------------------------------------------------------------

function BuyCard({ course, buyHref, isAgencyBundle }) {
  const priceText = course.priceLabel || fCurrency(course.price);

  return (
    <Card sx={{ p: 3, borderRadius: 2 }}>
      <Stack spacing={3}>
        <Stack direction="row" sx={{ typography: 'h3' }}>
          {priceText}
        </Stack>

        <Stack spacing={2}>
          <Typography variant="subtitle2">
            {isAgencyBundle ? 'This package includes:' : 'This course includes:'}
          </Typography>

          {course.time > 0 && (
            <Stack direction="row" alignItems="center" sx={{ typography: 'subtitle2' }}>
              <Iconify icon="carbon:time" sx={{ mr: 1 }} />
              {`${course.time} hours of content`}
            </Stack>
          )}

          {course.courseCount > 0 && (
            <Stack direction="row" alignItems="center" sx={{ typography: 'subtitle2' }}>
              <Iconify icon="carbon:book" sx={{ mr: 1 }} />
              {`${course.courseCount} included courses`}
            </Stack>
          )}

          <Stack direction="row" alignItems="center" sx={{ typography: 'subtitle2' }}>
            <Iconify icon="carbon:data-accessor" sx={{ mr: 1 }} />
            {isAgencyBundle ? 'Access managed from agency dashboard' : 'One year access of course'}
          </Stack>

          <Stack direction="row" alignItems="center" sx={{ typography: 'subtitle2' }}>
            <Iconify icon="carbon:devices" sx={{ mr: 1 }} />
            Access on desktops, tablets, mobile
          </Stack>

          <Stack direction="row" alignItems="center" sx={{ typography: 'subtitle2' }}>
            <Iconify icon="carbon:certificate" sx={{ mr: 1 }} />
            Certificate of completion
          </Stack>
        </Stack>

        <Button
          component="a"
          href={buyHref}
          variant="contained"
          size="large"
          color="secondary"
          sx={{ width: 1 }}
        >
          {course.ctaLabel || 'Buy now'}
        </Button>
      </Stack>
    </Card>
  );
}

BuyCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  course: PropTypes.object.isRequired,
  buyHref: PropTypes.string.isRequired,
  isAgencyBundle: PropTypes.bool.isRequired,
};
