'use client';

// import { useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useQuery } from 'react-query';
// import { redirect } from 'next/navigation';

import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
// import Typography from '@mui/material/Typography';

// import { _socials } from 'src/_mock';
import { useSearchParams } from 'next/navigation';
// import Iconify from 'src/components/iconify';
import { useRef, useEffect, useCallback } from 'react';

// import { useBoolean } from 'src/hooks/use-boolean';
import { getCourseData } from 'src/queries/course';
import { useUserStore } from 'src/states/auth-store';
import { quizProgress } from 'src/states/quiz-progress';
import { useResponsive } from 'src/hooks/use-responsive';
import { SplashScreen } from 'src/components/loading-screen';

import ElearningNewsletter from '../elearning-newsletter';
// import ElearningCourseListSimilar from '../list/elearning-course-list-similar';
import ElearningCourseDetailsHero from '../details/elearning-course-details-hero';
import ElearningCourseDetailsInfo from '../details/elearning-course-details-info';
import ElearningCourseDetailsSummary from '../details/elearning-course-details-summary';

// ----------------------------------------------------------------------

// const _mockCourse = _courses[0];

export default function ElearningCourseView({ courseId }) {
  const mdUp = useResponsive('up', 'md');
  const searchParams = useSearchParams();

  const myRef = useRef(null);
  const finalQuizRef = useRef(null);

  const executeScroll = () => myRef.current.scrollIntoView();

  const scrollToFinalQuiz = useCallback(() => {
    if (finalQuizRef.current) {
      finalQuizRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  // Auto-scroll to final quiz if ?quiz=final is in URL
  useEffect(() => {
    if (searchParams.get('quiz') === 'final' && finalQuizRef.current) {
      // Small delay to ensure content is rendered
      const timer = setTimeout(() => {
        finalQuizRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [searchParams]);

  const isQuizOpen = quizProgress((state) => state.isQuizOpen);

  const { data, isLoading } = useQuery({
    queryKey: ['course', courseId],
    queryFn: () => getCourseData(courseId),
    refetchOnWindowFocus: !isQuizOpen,
  });

  const userData = useUserStore((state) => state.UserData);
  const { isLoggedIn } = userData;

  const hasBoughtCourse =
    isLoggedIn &&
    data?.attributes?.users?.data?.filter((u) => u.id === userData.id.toString()).length > 0;

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <>
      <ElearningCourseDetailsHero executeScroll={executeScroll} course={data?.attributes} />

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
              <ElearningCourseDetailsInfo course={data} onSkipToFinalQuiz={scrollToFinalQuiz} />
            </Grid>
          )}

          <Grid xs={12} md={7} lg={8}>
            <ElearningCourseDetailsSummary 
              refProp={myRef} 
              finalQuizRef={finalQuizRef}
              course={data?.attributes} 
              courseId={data?.id} 
              hasBoughtCourse={hasBoughtCourse}
            />
          </Grid>

          <Grid xs={12} md={5} lg={4}>
            <Stack spacing={5}>
              {mdUp && <ElearningCourseDetailsInfo course={data} onSkipToFinalQuiz={scrollToFinalQuiz} />}

              {/* <Advertisement
                advertisement={{
                  title: 'Advertisement',
                  description: 'Duis leo. Donec orci lectus, aliquam ut, faucibus non',
                  // imageUrl: _mock.image.course(7),
                  path: '',
                }}
              /> */}
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* {mdUp && <Divider />} */}

      {/* <ReviewElearning /> */}

      {/* <ElearningCourseListSimilar courses={courseSimilar} /> */}

      <ElearningNewsletter />
    </>
  );
}

ElearningCourseView.propTypes = {
  courseId: PropTypes.string,
};
