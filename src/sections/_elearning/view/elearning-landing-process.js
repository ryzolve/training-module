import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';


// ----------------------------------------------------------------------

const COLORS = ['primary', 'secondary', 'warning', 'success'];

const SERVICES = [
  {
    name: 'Comprehensive',
    icon: '/assets/icons/service/comprehensive.svg',
    content: 'Our exams cover a wide range of topics to ensure a thorough evaluation.',
    bgcolor: '#f7efff',
    color: '#b566ff',
    hovercolor: '#dfc1fc',
    descriptionColor: '#012972',
  },
  {
    name: 'Convenient',
    icon: '/assets/icons/service/convienent.svg',
    content: 'Take our online courses and examinations at a pace that suits your unique schedule.',
    bgcolor: '#ffe0f2',
    color: '#ff6bc1',
    hovercolor: '#ffbce3',
    descriptionColor: '#8c0353',
  },
  {
    name: 'Certificate',
    icon: '/assets/icons/service/quality.svg',
    content:
      'Upon completion of the course certificate will be provided after completion of course.',
    bgcolor: '#ffe2d3',
    color: '#f56025',
    hovercolor: '#ffaf90',
    descriptionColor: '#7A4100',
  },
  {
    name: 'Quality Assurance',
    icon: '/assets/icons/service/certificate.svg',
    content: 'We set the bar for excellence in home and community support services.',
    bgcolor: '#d6eded',
    color: '#35b27c',
    hovercolor: '#92d1b6',
    descriptionColor: '#0A5554',
  },
];

// ----------------------------------------------------------------------

export default function ElearningLandingProcess() {
  return (
    <Box sx={{ bgcolor: 'background.neutral' }}>
      <Container
        sx={{
          py: { xs: 4, md: 10 },
        }}
      >
        <Stack
          spacing={3}
          sx={{
            maxWidth: 480,
            mb: { xs: 8, md: 5 },
            mx: { xs: 'auto', md: 'auto' },
            mt: { xs: 4, md: 5 },
            textAlign: { xs: 'center', md: 'center' },
          }}
        >
          {/* <Typography variant="overline" sx={{ color: 'text.disabled' }}>
            Work Flow
          </Typography> */}

          <Typography variant="h2">Why choose our exams</Typography>

          <Typography variant="subtitle1">
            Reliable assessment experience, combining rigorously crafted questions with a
            user-friendly interface, ensuring a comprehensive evaluation tailored to your learning
            journey.
          </Typography>
        </Stack>

        <Box
          sx={{
            gap: 4,
            display: 'grid',
            alignItems: 'flex-end',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
          }}
        >
          {SERVICES.map((service, index) => (
            <ServiceItem key={service.name} service={service} index={index} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

function ServiceItem({ service, index }) {
  const { name, icon, content, bgcolor, color, hovercolor, descriptionColor } = service;

  return (
    <Card
      sx={{
        p: 2,
        color,
        descriptionColor,
        // bgcolor: (theme) => theme.palette[COLORS[index]].light,
        bgcolor,
        '&:hover': {
          transition: 'transform 1s ease-in-out',
          boxShadow: () => `-0px 0px 14px ${hovercolor}`,
          transform: 'scale(1.05)',
          '& img': {
            transition: 'transform 1s ease-in-out',
            animation: 'bounce 1s',
          },
          '@keyframes bounce': {
            '0%, 20%, 50%, 80%, 100%': {
              transform: 'translateY(0)',
            },
            '40%': {
              transform: 'translateY(-10px)',
            },
            '60%': {
              transform: 'translateY(-10px)',
            },
          },
          // boxShadow: alpha(color, 0.2),
        },
        ...(index === 1 && {
          mb: { md: 2.5 },
        }),
        ...(index === 2 && {
          mb: { md: 5 },
        }),
        ...(index === 3 && {
          mb: { md: 7.5 },
        }),
      }}
    >
      {/* <SvgColor
        src={icon}
        sx={{
          width: 64,
          height: 64,
          // opacity: 0.48,
        }}
      /> */}

      <img src={icon} alt="icon" />

      <Typography variant="h5" sx={{ mt: 2, mb: 1, textAlign: 'left' }}>
        {name}
      </Typography>
      <Typography variant="body" sx={{ mt: 2, textAlign: 'right', color: descriptionColor }}>
        {content}
      </Typography>
    </Card>
  );
}

ServiceItem.propTypes = {
  index: PropTypes.number,
  service: PropTypes.shape({
    name: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    content: PropTypes.string,
    color: PropTypes.string,
    bgcolor: PropTypes.string,
    hovercolor: PropTypes.string,
    descriptionColor: PropTypes.string,
  }),
};
