import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';

import ElearningPublicCourseItem from './elearning-public-course-item';
import ElearningCourseItemSkeleton from './elearning-course-item-skeleton';

// ----------------------------------------------------------------------
// Public-catalog list. Renders courses fetched from the new platform's
// public API (api.ryzolve.app). Items are simple cards that link straight
// to the new platform — no cart/wishlist/login state on this surface.
// ----------------------------------------------------------------------

export default function ElearningPublicCourseList({ courses, loading, filters }) {
  const filterCourseByText = (course) => {
    if (!filters?.text || filters.text.length === 0) return true;
    return course.attributes.title.toLowerCase().includes(filters.text.toLowerCase());
  };

  return (
    <Stack
      spacing={3}
      direction={{ xs: 'column', md: 'row' }}
      flexWrap={{ md: 'wrap' }}
      alignItems={{ md: 'flex-start' }}
      sx={{
        textAlign: { xs: 'center', md: 'unset' },
      }}
    >
      {(courses || [])
        .filter(filterCourseByText)
        .map((course, index) =>
          course ? (
            <ElearningPublicCourseItem key={course.id} course={course} vertical />
          ) : (
            <ElearningCourseItemSkeleton key={index} />
          )
        )}
    </Stack>
  );
}

ElearningPublicCourseList.propTypes = {
  courses: PropTypes.array,
  loading: PropTypes.bool,
  filters: PropTypes.object,
};
