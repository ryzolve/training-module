import { memo } from 'react';
import { m } from 'framer-motion';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import Image from 'src/components/image';

import Shape from './pattern/shape';
import Pattern02 from './pattern/pattern-02';

// ----------------------------------------------------------------------


const varDown = {
  animate: { y: [8, -8, 8], x: [4, -4, 4] },
  transition: { duration: 8, repeat: Infinity },
};

// const varLeft = {w

const varRight = {
  animate: { x: [8, -8, 8], y: [4, -4, 4] },
  transition: { duration: 7, repeat: Infinity },
};

// ----------------------------------------------------------------------

function ElearningHeroIllustration({ sx, ...other }) {
  const theme = useTheme();


  return (
    <Box
      sx={{
        width: 850,
        height: 600,
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        justifyContent: 'center',
        ...sx,
      }}
      {...other}
    >
      <Box sx={{ right: 10, bottom: 28, zIndex: 8 }}>
        <Image
          visibleByDefault
          // disabledEffect
          alt="teacher"
          src="/assets/images/course/hero2.gif"
          sx={{ width: 846, height: 490 }}
        />
      </Box>

      <Box
        {...varDown}
        component={m.div}
        sx={{ position: 'absolute', left: 300, bottom: 100, zIndex: 8 }}
      >
        <Image
          visibleByDefault
          disabledEffect
          alt="book icon"
          src="/assets/icons/ic_book.png"
          sx={{ width: 50, height: 62 }}
        />
      </Box>

      <Box
        {...varRight}
        component={m.div}
        sx={{ position: 'absolute', left: 600, top: 20, zIndex: 8 }}
      >
        <Image
          visibleByDefault
          disabledEffect
          alt="pencil icon"
          src="/assets/icons/ic_pencil.png"
          sx={{ width: 60, height: 77 }}
        />
      </Box>

      {/* <Pattern01 sx={{ left: 0, top: 0 }} /> */}
      <Pattern02 sx={{ top: 65, left: 280, opacity: 0.74, transform: 'scale(1.2)' }} />
      <Shape sx={{ position: 'absolute', right: 120, bottom: 40 }} />
    </Box>
  );
}

ElearningHeroIllustration.propTypes = {
  sx: PropTypes.object,
};

export default memo(ElearningHeroIllustration);
