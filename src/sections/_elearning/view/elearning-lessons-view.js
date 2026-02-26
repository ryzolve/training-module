'use client';

import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { paths } from 'src/routes/paths';
import { getCourseData } from 'src/queries/course';
import { useUserStore } from 'src/states/auth-store';
import { SplashScreen } from 'src/components/loading-screen';

import ElearningCourseDetailsLessonsDialog from '../details/elearning-course-details-lessons-dialog';

// ----------------------------------------------------------------------

export default function ElearningLessonsView({ params }) {
  const [selectedLesson, setSelectedLesson] = useState(null);

  const searchParams = useSearchParams();

  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ['course', params.id],
    queryFn: () => getCourseData(params.id),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data)
      setSelectedLesson(
        data.attributes.units.data
          .find((unit) => unit.id.toString() === searchParams.get('unit'))
          ?.attributes.lesson.find((lesson) => lesson.title === searchParams.get('lesson'))
      );
  }, [data, searchParams]);

  const userData = useUserStore((state) => state.UserData);

  const { isLoggedIn, authToken } = userData;

  const { data: userCourses, isLoading: isUserCoursesLoading } = useQuery({
    queryKey: ['userCourses', userData?.id],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/user-courses`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (!res.ok) throw new Error('Failed to fetch user courses');
      return res.json();
    },
    enabled: !!isLoggedIn && !!authToken,
    refetchOnWindowFocus: false,
  });

  const hasBoughtCourse =
    isLoggedIn &&
    userCourses?.some((c) => c.id?.toString() === params.id?.toString());

  const handleSelectedLesson = (lesson) => {
    setSelectedLesson(lesson);
  };

  if (isLoading || (isLoggedIn && isUserCoursesLoading)) return <SplashScreen />;

  if (!hasBoughtCourse) return router.push(paths.loginBackground);

  return (
    <ElearningCourseDetailsLessonsDialog
      units={data.attributes.units.data}
      selectedLesson={selectedLesson}
      onSelectedLesson={handleSelectedLesson}
      hasBoughtCourse={hasBoughtCourse}
      params={params}
      courseTitle={data?.attributes}
      courseQuiz={data?.attributes?.quiz}
    />
  );
}

ElearningLessonsView.propTypes = {
  params: PropTypes.object,
};
