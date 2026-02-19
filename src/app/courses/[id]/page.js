'use client';

import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-toastify/dist/ReactToastify.css';
// eslint-disable-next-line import/no-extraneous-dependencies

import MainLayout from 'src/layouts/main';
import ElearningCourseView from 'src/sections/_elearning/view/elearning-course-view';

// ----------------------------------------------------------------------

export default function ElearningCoursePage({ params }) {
  return (
    <MainLayout>
      <ElearningCourseView courseId={params.id} />
    </MainLayout>
  );
}

ElearningCoursePage.propTypes = {
  params: PropTypes.object,
};
