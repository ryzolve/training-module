import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

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

  const items = loading ? Array.from({ length: 3 }) : (courses || []).filter(filterCourseByText);

  return (
    <Box
      sx={{
        gap: 3,
        display: 'grid',
        textAlign: { xs: 'center', md: 'unset' },
        gridTemplateColumns: {
          xs: 'minmax(0, 1fr)',
          sm: 'repeat(2, minmax(0, 1fr))',
          md: 'repeat(3, minmax(0, 1fr))',
        },
      }}
    >
      {items.map((course, index) =>
        course ? (
          <ElearningPublicCourseItem key={course.id} course={course} vertical />
        ) : (
          <ElearningCourseItemSkeleton key={index} />
        )
      )}
    </Box>
  );
}

ElearningPublicCourseList.propTypes = {
  courses: PropTypes.array,
  loading: PropTypes.bool,
  filters: PropTypes.object,
};
