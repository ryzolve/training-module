import PropTypes from 'prop-types';
import { memo, useState, useCallback } from 'react';

import List from '@mui/material/List';
import Stack from '@mui/material/Stack';

import { navVerticalConfig } from '../config';

import NavList from './nav-list';

// ----------------------------------------------------------------------

function NavSectionVertical({ data, config, sx, ...other }) {
  return (
    <Stack sx={sx} {...other}>
      {/* {data.map((group, index) => (
        <Group
          key={group.subheader || index}
          items={group.items}
          config={navVerticalConfig(config)}
        />
      ))} */}
      <Group items={data} config={navVerticalConfig(config)} />
    </Stack>
  );
}

NavSectionVertical.propTypes = {
  config: PropTypes.object,
  data: PropTypes.array,
  sx: PropTypes.object,
};

export default memo(NavSectionVertical);

// ----------------------------------------------------------------------

function Group({ subheader, items, config }) {
  const [open, setOpen] = useState(true);

  const handleToggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const renderContent = items.map((list) => (
    <NavList
      key={list.title + list.path}
      data={list}
      depth={1}
      hasChild={!!list.children}
      config={config}
    />
  ));

  return (
    <List disablePadding sx={{ px: 4 }}>
      {renderContent}
    </List>
  );
}

Group.propTypes = {
  config: PropTypes.object,
  items: PropTypes.array,
  subheader: PropTypes.string,
};
