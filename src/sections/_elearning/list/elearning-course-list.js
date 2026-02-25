import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
// import Pagination, { paginationClasses } from '@mui/material/Pagination';

import ElearningCourseItem from './elearning-course-item';
import ElearningCourseItemSkeleton from './elearning-course-item-skeleton';

// ----------------------------------------------------------------------

export default function ElearningCourseList({ courses, loading, filters }) {
  const filterCourseByText = (course) => {
    if (filters.text.length === 0) return true;
    return course.attributes.title.toLowerCase().includes(filters.text.toLowerCase());
  };

  // const filterByRating = (course) => {
  //   if (filters.rating === null) return true;
  //   return Number(course.ratingNumber) >= Number(filters.rating);
  // };

  const filterByDuration = (course) => {
    if (filters.duration.length === 0) return true;
    return (
      (filters.duration.includes('0 - 1 Hour') && course.attributes.time <= 1) ||
      (filters.duration.includes('1 - 3 Hours') && course.attributes.time <= 3) ||
      (filters.duration.includes('3 - 6 Hours') && course.attributes.time <= 6) ||
      (filters.duration.includes('6 - 18 Hours') && course.attributes.time <= 18) ||
      (filters.duration.includes('18+ Hours') && course.attributes.time > 18)
    );
  };

  const filterByCategory = (course) => {
    if (filters.category.length === 0) return true;
    const categoriesFilter = filters.category.map((value) => value.toLowerCase());
    return categoriesFilter.includes(course.attributes.category.data.attributes.name.toLowerCase());
  };

  const filterByFee = (course) => {
    if (filters.fee.length === 0) return true;

    if (course.priceSale) {
      return (
        (filters.fee.includes('Free') && course.priceSale === 0) ||
        (filters.fee.includes('Paid') && course.priceSale !== 0)
      );
    }

    return (
      (filters.fee.includes('Free') && course.attributes.price === 0) ||
      (filters.fee.includes('Paid') && course.attributes.price !== 0)
    );
  };

  return (
    <>
      <Stack
        spacing={3}
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ md: 'flex-end' }}
        sx={{
          textAlign: { xs: 'center', md: 'unset' },
        }}
      >
        {(courses || [])
          .filter(filterCourseByText)

          .filter(filterByDuration)
          .filter(filterByCategory)
          .filter(filterByFee)
          .map((course, index) =>
            course ? (
              <ElearningCourseItem key={course.id} course={course} vertical />
            ) : (
              <ElearningCourseItemSkeleton key={index} />
            )
          )}
      </Stack>

      {/* <Pagination
        count={10}
        color="primary"
        sx={{
          my: 10,
          [`& .${paginationClasses.ul}`]: {
            justifyContent: 'center',
          },
        }}
      /> */}
    </>
  );
}

ElearningCourseList.propTypes = {
  courses: PropTypes.array,
  loading: PropTypes.bool,
  filters: PropTypes.object,
};
