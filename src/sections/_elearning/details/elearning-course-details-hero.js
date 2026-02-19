import PropTypes from 'prop-types';
// import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { _mock } from 'src/_mock';
import Label from 'src/components/label';
import { paths } from 'src/routes/paths';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { PlayerDialog } from 'src/components/player';
import { useResponsive } from 'src/hooks/use-responsive';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// import ElearningCourseDetailsLessonsDialog from './elearning-course-details-lessons-dialog';

// ----------------------------------------------------------------------

export default function ElearningCourseDetailsHero({ course, executeScroll }) {
  const {
    title,
    // level = 'Beginner',
    // lessons,
    category,
    // coverUrl,
    // languages,
    bestSeller,
    time,
    description,
    rating,
    totalReviews,
    totalStudents,
    // teachers = [],
    units,
    users,
    image,
  } = course;

  // const [selectedLesson, setSelectedLesson] = useState(null);

  // const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  const videoOpen = useBoolean();

  // const videoPlay = useBoolean();

  const totalLessons = units?.data.reduce(
    (count, unit) => (unit.attributes.lesson ? count + unit.attributes.lesson.length : count),
    0
  );

  const totalQuizzes = units?.data.length;

  const languages = ['English'];

  // const handleSelectedLesson = useCallback((lesson) => {
  //   if (lesson.unLocked) {
  //     setSelectedLesson(lesson);
  //   }
  // }, []);

  // const handleClose = useCallback(() => {
  //   setSelectedLesson(null);
  //   videoPlay.onFalse();
  // }, [videoPlay]);

  // const handleReady = useCallback(() => {
  //   setTimeout(() => videoPlay.onTrue(), 500);
  // }, [videoPlay]);

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
                gap={8}
                sx={{
                  position: 'relative',
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <Image
                  alt="hero"
                  src={image}
                  sx={{ height: '100%', width: '100%', objectFit: 'cover' }}
                  // overlay={`linear-gradient(to bottom, ${alpha(
                  //   theme.palette.common.black,
                  //   0
                  // )} 0%, ${theme.palette.common.black} 75%)`}
                />
                <Button color="secondary" size="large" variant="contained" onClick={executeScroll}>
                  Start Learning
                </Button>
              </Stack>
            </Grid>

            <Grid xs={12} md={7}>
              <Stack spacing={3}>
                <Stack spacing={2} alignItems="flex-start">
                  {bestSeller && (
                    <Label color="warning" variant="filled" sx={{ textTransform: 'uppercase' }}>
                      Best Seller
                    </Label>
                  )}

                  <Typography variant="overline" sx={{ color: 'secondary.main' }}>
                    {category?.data?.attributes.name}
                  </Typography>

                  <Typography variant="h3" component="h1">
                    {title}
                  </Typography>

                  <Typography variant="subtitle1">{description}</Typography>
                </Stack>

                {/* <Stack spacing={3}>
                  <Typography variant="h4">What does this course cover</Typography>
                  <Stack spacing={1}>
                    {course.WhatDoesThisCourseCover?.map((learn) => (
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
                </Stack> */}

                <Stack spacing={3}>
                  <Typography variant="h4">What You Will Learn</Typography>
                  <Stack spacing={1}>
                    {course.WhatYouWillLearn?.map((learn) => (
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

                <Stack
                  spacing={1.5}
                  direction="row"
                  alignItems="center"
                  divider={<Divider orientation="vertical" sx={{ height: 20 }} />}
                >
                  {/* <Stack spacing={0.5} direction="row" alignItems="center">
                    <Iconify icon="carbon:star-filled" sx={{ color: 'warning.main' }} />
                    <Box sx={{ typography: 'h6' }}>
                      {Number.isInteger(rating) ? `${rating}.0` : rating}
                    </Box>

                    {totalReviews && (
                      <Link variant="body2" sx={{ color: 'text.secondary' }}>
                        ({fShortenNumber(totalReviews)} reviews)
                      </Link>
                    )}
                  </Stack> */}

                  {/* <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1.2}
                    divider={<Divider orientation="vertical" sx={{ height: 18 }} />}
                  >
                    <Iconify icon="heroicons-outline:users" />
                    <Typography sx={{ fontSize: 16 }}>
                      {' '}
                      {fShortenNumber(users?.data.length)}{' '}
                      {users?.data.length === 1 ? 'Student' : 'Students'} Enrolled
                    </Typography>
                  </Stack> */}
                </Stack>

                {/* <Stack direction="row" alignItems="center">
                  <Avatar src={teachers[0]?.avatarUrl} />

                  <Typography variant="body2" sx={{ ml: 1, mr: 0.5 }}>
                    {teachers[0]?.name}
                  </Typography>

                  {!!teachers.length && (
                    <Link underline="always" color="text.secondary" variant="body2">
                      + {teachers.length} teachers
                    </Link>
                  )}
                  <Stack className="ml-2 md:ml-12">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleSelectedLesson(lessons[0])}
                    >
                      Start Now
                    </Button>
                  </Stack>
                </Stack> */}

                <Divider sx={{ borderStyle: 'dashed' }} />

                <Stack spacing={2}>
                  <Stack
                    direction="row"
                    flexWrap="wrap"
                    sx={{
                      '& > *': { my: 0.5, mr: 3 },
                    }}
                  >
                    <Stack direction="row" alignItems="center" sx={{ typography: 'subtitle2' }}>
                      <Iconify icon="carbon:time" sx={{ mr: 1 }} /> {`${time} Hours`}
                    </Stack>

                    <Stack direction="row" alignItems="center" sx={{ typography: 'subtitle2' }}>
                      <Iconify icon="carbon:document" sx={{ mr: 1 }} />
                      {`${totalLessons} Lessons`}
                    </Stack>
                    {/* 
                    <Stack direction="row" alignItems="start" sx={{ typography: 'subtitle2' }}>
                      <Iconify icon="carbon:content-delivery-network" sx={{ mr: 1 }} />
                      {typeof languages === 'string' ? languages : languages?.join(', ')}
                    </Stack> */}

                    <Stack direction="row" alignItems="center" sx={{ typography: 'subtitle2' }}>
                      {totalQuizzes > 0 ? (
                        <Stack direction="row">
                          <Iconify icon="carbon:help" sx={{ mr: 1 }} />
                          {`${totalQuizzes} Practice quizs`}
                        </Stack>
                      ) : (
                        'No Practice Assessments'
                      )}
                    </Stack>

                    <Stack direction="row" sx={{ typography: 'subtitle2' }}>
                      <Iconify icon="carbon:certificate" sx={{ mr: 1 }} />
                      <span>1 Certification Assessment</span>
                    </Stack>
                  </Stack>

                  {/* <Stack
                    direction="row"
                    flexWrap="wrap"
                    sx={{
                      '& > *': { my: 0.5, mr: 3 },
                    }}
                  >
                    <Stack direction="row" alignItems="start" sx={{ typography: 'subtitle2' }}>
                      <Iconify icon="carbon:content-delivery-network" sx={{ mr: 1 }} />
                      {typeof languages === 'string' ? languages : languages?.join(', ')}
                    </Stack>

                    <Stack direction="row" alignItems="center" sx={{ typography: 'subtitle2' }}>
                      {totalQuizzes > 0 ? (
                        <Stack direction="row">
                          <Iconify icon="carbon:help" sx={{ mr: 1 }} />
                          {`${totalQuizzes} Practice Assessments`}
                        </Stack>
                      ) : (
                        'No Practice Assessments'
                      )}
                    </Stack>
                  </Stack>
                  <Stack direction="row" alignItems="center" sx={{ typography: 'subtitle2' }}>
                    <Stack direction="row">
                      <Iconify icon="carbon:certificate" sx={{ mr: 1 }} />
                      <span>1 Certification Assessment</span>
                    </Stack>
                  </Stack> */}
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <PlayerDialog open={videoOpen.value} onClose={videoOpen.onFalse} videoPath={_mock.video(0)} />
    </>
  );
}

ElearningCourseDetailsHero.propTypes = {
  course: PropTypes.shape({
    title: PropTypes.string,
    level: PropTypes.string,
    lessons: PropTypes.array,
    teachers: PropTypes.array,
    bestSeller: PropTypes.bool,
    category: PropTypes.object,
    coverUrl: PropTypes.string,
    time: PropTypes.number,
    description: PropTypes.string,
    rating: PropTypes.number,
    totalReviews: PropTypes.number,
    totalStudents: PropTypes.number,
    languages: PropTypes.arrayOf(PropTypes.string),
    units: PropTypes.object,
    users: PropTypes.object,
    image: PropTypes.string,
    WhatYouWillLearn: PropTypes.any,
  }),
  executeScroll: PropTypes.func,
};
