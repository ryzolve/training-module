'use client';

import axios from 'axios';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { useState, useCallback } from 'react';

import { useUserStore } from 'src/states/auth-store';
import { quizProgress } from 'src/states/quiz-progress';
// import { useBoolean } from 'src/hooks/use-boolean';

import ElearningCourseDetailsLessonItem from './elearning-course-details-lesson-item';
// import ElearningCourseDetailsLessonsDialog from './elearning-course-details-lessons-dialog';

// ----------------------------------------------------------------------

export default function ElearningCourseDetailsLessonList({ lessons, hasBoughtCourse, unitId }) {
  // const videoPlay = useBoolean();

  const userData = useUserStore((state) => state.UserData);

  const isQuizOpen = quizProgress((state) => state.isQuizOpen);

  const { isLoggedIn } = userData;

  const [expanded, setExpanded] = useState(false);

  const [selectedLesson, setSelectedLesson] = useState(null);

  const [userLessonData, setUserLessonData] = useState([]);

  const userToken = localStorage.getItem('token');

  // const handleReady = useCallback(() => {
  //   setTimeout(() => videoPlay.onTrue(), 500);
  // }, [videoPlay]);

  const { data: userProgressData } = useQuery({
    queryKey: ['userProgress'],
    queryFn: () => getUserProgress(),
    enabled: !!isLoggedIn,
    refetchOnWindowFocus: !isQuizOpen,
  });

  const getUserProgress = async () => {
    try {
      const res = await axios.get(process.env.NEXT_PUBLIC_METADATA_URL, {
        // method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      });

      res?.data.forEach((list) => {
        setUserLessonData(
          list.data.map((l) => ({ LessonTitle: l.LessonTitle, course_id: l.course_id }))
        );

        // list.data.forEach((listData) => {
        //   userLessonData.forEach((userLesson) => {
        //     if (userLesson.LessonTitle !== listData.LessonTitle) {
        //       //
        //       setUserLessonData((prev) => [...prev, { LessonTitle: listData.LessonTitle }]);
        //     }
        //   });
        // });
      });
      if (res.data.length === 0) {
        // refetch();
      }
      // res?.data.map((list) =>
      //   if(userLessons.LessonTitle)
      //   updateLessons(list.data.map((l) => ({ LessonTitle: l.LessonTitle })))
      // );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectedLesson = useCallback((lesson) => {
    if (lesson.unLocked) {
      setSelectedLesson(lesson);
    }
  }, []);

  // const handleClose = useCallback(() => {
  //   setSelectedLesson(null);
  //   videoPlay.onFalse();
  // }, [videoPlay]);

  const handleExpandedLesson = useCallback(
    (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    },
    []
  );

  // const pauseVideo = useCallback(() => {
  //   videoPlay.onFalse();
  // }, [videoPlay]);

  return (
    <div>
      {lessons.map((lesson, index) => (
        <ElearningCourseDetailsLessonItem
          key={index}
          index={index}
          lesson={lesson}
          userLessonData={userLessonData}
          expanded={expanded === lesson.title}
          onExpanded={handleExpandedLesson(lesson.title)}
          selected={selectedLesson?.title === lesson.title}
          onSelected={() => {
            handleSelectedLesson(lesson);
          }}
          hasBoughtCourse={hasBoughtCourse}
          unitId={unitId}
        />
      ))}

      {/* <ElearningCourseDetailsLessonsDialog
        selectedLesson={selectedLesson}
        onSelectedLesson={(lesson) => setSelectedLesson(lesson)}
        open={hasBoughtCourse && !!selectedLesson?.unLocked}
        onClose={handleClose}
        playing={videoPlay.value}
        onReady={handleReady}
        onEnded={videoPlay.onFalse}
        onPlay={videoPlay.onTrue}
        onPause={videoPlay.onFalse}
        units={units}
        pauseVideo={pauseVideo}
        hasBoughtCourse={hasBoughtCourse}
      /> */}
    </div>
  );
}

ElearningCourseDetailsLessonList.propTypes = {
  lessons: PropTypes.array,
  hasBoughtCourse: PropTypes.bool,
  unitId: PropTypes.string,
};
