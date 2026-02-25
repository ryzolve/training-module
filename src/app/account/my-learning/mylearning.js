'use client';

import axios from 'axios';
import { useQuery } from 'react-query';
// import * as Yup from 'yup';
import { useState, useEffect } from 'react';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useForm, Controller } from 'react-hook-form';

// import Box from '@mui/material/Box';
import { Link } from '@mui/material';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
// import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// import LoadingButton from '@mui/lab/LoadingButton';

// import { _mock } from 'src/_mock';
import Image from 'src/components/image';
import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import { axiosClient } from 'src/utils/axiosClient';
import { useUserStore } from 'src/states/auth-store';
import ElearningCourseItem from 'src/sections/_elearning/list/elearning-course-item';

import MyLearningCard from '../../../sections/_ecommerce/account/mylearning-card';

// ----------------------------------------------------------------------

export default function AccountPersonalView() {
  const userData = useUserStore((state) => state.UserData);
  const [quizScore, setQuizScore] = useState([]);
  const [userLessonData, setUserLessonData] = useState([]);
  const [quizJourneyData, setQuizJourneyData] = useState([]);

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const data = await axiosClient.get('/api/quiz-scores', {
          headers: {
            Authorization: `Bearer ${userData.authToken}`,
          },
        });

        setQuizScore(
          (data?.data?.data || []).filter((scoreData) => userData.username === scoreData.attributes.username)
        );
      } catch (error) {
        console.error('Failed to fetch quiz scores:', error);
      }
    };
    fetchScore();

    const getUserProgress = async () => {
      try {
        const res = await axios.get(process.env.NEXT_PUBLIC_METADATA_URL, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userData.authToken}`,
          },
        });

        const allEntries = (res?.data || []).flatMap((list) => list?.data || []);
        setUserLessonData(
          allEntries.filter((entry) => !entry?.entryType || entry?.entryType === 'lesson')
        );
        setQuizJourneyData(
          allEntries.filter(
            (entry) =>
              entry?.entryType === 'quiz_unit' || entry?.entryType === 'quiz_final'
          )
        );
      } catch (error) {
        console.log(error);
      }
    };
    getUserProgress();
  }, [userData.authToken, userData.username]);

  const { data } = useQuery(['repoData', userData.id], () =>
    axiosClient.get('/api/user-courses', {
      headers: {
        Authorization: `Bearer ${userData.authToken}`,
      },
    })
  );

  const coursesCompletedFilter = () => {
    const courseScores = {};
    const passThreshold = Number(process.env.NEXT_PUBLIC_PASS_THRESHOLD) || 90;

    quizScore.forEach((quizData) => {
      const { courseTitle, score } = quizData.attributes;
      const numericScore = Number(score);

      if (!courseScores[courseTitle] || numericScore > courseScores[courseTitle].score) {
        courseScores[courseTitle] = { score: numericScore, courseTitle };
      }
    });

    const completedCourses = Object.values(courseScores).filter((quizData) => {
      const totalQuestions = 10;
      return (quizData.score / totalQuestions) * 100 >= passThreshold;
    });

    return completedCourses.length;
  };

  const ProfileData = [
    {
      id: 1,
      title: 'Courses Enrolled',
      score: data?.data ? data.data.length : 0,
    },
    {
      id: 2,
      title: 'Lessons Completed',
      score: userLessonData?.length || 0,
    },
    {
      id: 3,
      title: 'Quizzes Attempted',
      score: quizJourneyData?.length || 0,
    },
    {
      id: 4,
      title: 'Courses Completed',
      score: coursesCompletedFilter(),
    },
  ];

  return (
    <>
      <Typography variant="h5" sx={{ mb: 3 }}>
        My Courses
      </Typography>

      <Stack direction="row" spacing={2}>
        {ProfileData.map((profile) => (
          <MyLearningCard voucher={profile} />
        ))}
      </Stack>

      {data &&
        (data.data?.length > 0 ? (
          <Grid
            container
            spacing={2}
            sx={{
              position: 'relative',
              ml: { md: -2 },
              mt: 5,
            }}
          >
            {data.data.map((course) => {
              const newCourse = {
                id: course.id,
                attributes: course,
              };

              return (
                <Grid
                  item
                  md={6}
                  key={course.id}
                  sx={{
                    px: 2,
                    pt: { xs: 8, md: 15 },
                  }}
                >
                  <ElearningCourseItem course={newCourse} vertical isMyLearning />
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Stack
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              position: 'relative',
              ml: { md: -2 },
              mt: { xs: 12, md: 10 },
            }}
          >
            <Image
              alt="Empty State My Learning"
              src="/assets/images/empty-states/no-learning.png"
              sx={{
                height: { xs: 122, md: 182 },
                width: { xs: 160, md: 220 },
                objectFit: 'cover',
              }}
            />

            <Link component={RouterLink} href={paths.eLearning.courses} sx={{ pt: 12, pl: 4 }}>
              <Button
                // sx={{ bgcolor: '#FF774B' }}
                color="secondary"
                size="large"
                variant="contained"
                startIcon={<Iconify icon="carbon:chevron-left" />}
              >
                Explore Now
              </Button>
            </Link>
          </Stack>
        ))}
    </>
  );
}
