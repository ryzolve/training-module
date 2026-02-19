import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
// import { useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';

import { useResponsive } from 'src/hooks/use-responsive';
import { getCategoriesData } from 'src/queries/categories';

import FilterFee from './filter-fee';
// import FilterLevel from './filter-level';
// import FilterRating from './filter-rating';
// import FilterLanguage from './filter-language';
// import FilterDuration from './filter-duration';
// import FilterCategories from './filter-categories';
import FilterMultiSelect from './filter-multiselect';

// ----------------------------------------------------------------------

// const defaultValues = {
//   filterDuration: [],
//   filterCategories: [],
//   filterRating: null,
//   filterFee: [],
//   filterLevel: [],
//   filterLanguage: [],
// };

export default function ElearningFilters({ open, onClose, filters, setFilters }) {
  const mdUp = useResponsive('up', 'md');

  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategoriesData,
  });

  const categories = data ? data.map((categoryData) => categoryData.attributes.name) : [];

  // const [filters, setFilters] = useState(defaultValues);

  // const handleChangeRating = useCallback(
  //   (event) => {
  //     setFilters({
  //       ...filters,
  //       filterRating: event.target.value,
  //     });
  //   },
  //   [filters]
  // );

  // const handleChangeCategory = useCallback(
  //   (newValue) => {
  //     setFilters({
  //       ...filters,
  //       filterCategories: newValue,
  //     });
  //   },
  //   [filters]
  // );

  // const handleChangeLevel = useCallback(
  //   (event) => {
  //     const {
  //       target: { value },
  //     } = event;
  //     setFilters({
  //       ...filters,
  //       filterLevel: typeof value === 'string' ? value.split(',') : value,
  //     });
  //   },
  //   [filters]
  // );

  // const handleChangeFee = useCallback(
  //   (event) => {
  //     const {
  //       target: { value },
  //     } = event;
  //     setFilters({
  //       ...filters,
  //       filterFee: typeof value === 'string' ? value.split(',') : value,
  //     });
  //   },
  //   [filters]
  // );

  // const handleChangeDuration = useCallback(
  //   (event) => {
  //     const {
  //       target: { value },
  //     } = event;
  //     setFilters({
  //       ...filters,
  //       filterDuration: typeof value === 'string' ? value.split(',') : value,
  //     });
  //   },
  //   [filters]
  // );

  // const handleChangeLanguage = useCallback(
  //   (newValue) => {
  //     setFilters({
  //       ...filters,
  //       filterLanguage: newValue,
  //     });
  //   },
  //   [filters]
  // );

  // const handleChangeSearch = (event) => {
  //   setSearch(event.target.value);
  // };

  const handleFilterChange = (event) => {
    setFilters((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const renderContent = (
    <Stack
      spacing={2.5}
      sx={{
        flexShrink: 0,
        width: { xs: 1, md: 280 },
      }}
    >
      {/* <TextField
        fullWidth
        hiddenLabel
        placeholder="Search..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="carbon:search" width={24} sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
        name="text"
        value={filters.text}
        onChange={handleFilterChange}
      /> */}
      {/* 
      <Block title="Ratings">
        <FilterRating
          name="rating"
          filterRating={filters.filterRating}
          onChangeRating={handleFilterChange}
        />
      </Block> */}

      <Block title="Duration">
        <FilterMultiSelect
          name="duration"
          filterSelect={filters.duration}
          onChangeSelect={handleFilterChange}
          type="duration"
        />
      </Block>

      <Block title="Category">
        <FilterMultiSelect
          name="category"
          filterSelect={filters.category}
          onChangeSelect={handleFilterChange}
          type="category"
          categories={categories}
        />
      </Block>

      {/* <Block title="Level">
        <FilterLevel filterLevel={filters.filterLevel} onChangeLevel={handleChangeLevel} />
      </Block> */}

      <Block title="Fee">
        <FilterFee name="fee" filterFee={filters.fee} onChangeFee={handleFilterChange} />
      </Block>

      {/* <Block title="Language">
        <FilterLanguage
          filterLanguage={filters.filterLanguage}
          onChangeLanguage={handleChangeLanguage}
        />
      </Block> */}
    </Stack>
  );

  return (
    <>
      {mdUp ? (
        renderContent
      ) : (
        <Drawer
          anchor="right"
          open={open}
          onClose={onClose}
          PaperProps={{
            sx: {
              pt: 5,
              px: 3,
              width: 280,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </>
  );
}

ElearningFilters.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  filters: PropTypes.object,
  setFilters: PropTypes.func,
};

// ----------------------------------------------------------------------

function Block({ title, children }) {
  return (
    <Stack spacing={1.5}>
      <Typography variant="overline" sx={{ color: 'text.disabled' }}>
        {title}
      </Typography>

      {children}
    </Stack>
  );
}

Block.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};
