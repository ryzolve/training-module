import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import Image from 'src/components/image';
import { fCurrency } from 'src/utils/format-number';
import TextMaxLine from 'src/components/text-max-line';
import { getNewPlatformCourseUrl } from 'src/queries/elearning-public';

// ----------------------------------------------------------------------
// Public-catalog card. Individual courses link to the learner app checkout;
// agency packages link to the agency signup flow.
// ----------------------------------------------------------------------

export default function ElearningPublicCourseItem({ course, vertical }) {
  const { attributes } = course;
  const {
    title,
    price,
    description,
    image,
    slug,
    ctaLabel,
    priceLabel,
    courseCount,
    catalogType,
  } = attributes;

  const detailHref = `/e-learning/course?slug=${encodeURIComponent(slug)}`;
  const buyHref = getNewPlatformCourseUrl(slug, { autoBuy: true, catalogType });
  const displayPrice = priceLabel || fCurrency(price);
  const imageSrc = image || '/assets/images/course/course_hero.svg';

  return (
    <Card
      sx={{
        height: 1,
        display: 'flex',
        flexDirection: 'column',
        width: 1,
        '&:hover': {
          boxShadow: (theme) => theme.customShadows.z24,
        },
      }}
    >
      <Box sx={{ flexShrink: 0 }}>
        <Link href={detailHref} color="inherit">
          <Image
            ratio="4/3"
            alt={title}
            src={imageSrc}
            sx={{
              width: 1,
              bgcolor: 'background.neutral',
            }}
          />
        </Link>
      </Box>

      <Stack spacing={3} sx={{ p: 3, flexGrow: 1 }} width="100%">
        <Stack
          spacing={{
            xs: 3,
            sm: vertical ? 3 : 1,
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h4">{displayPrice}</Typography>
            {courseCount > 0 && (
              <Chip size="small" variant="soft" color="primary" label={`${courseCount} courses`} />
            )}
          </Stack>

          <Stack spacing={1}>
            <Link href={detailHref} color="inherit">
              <TextMaxLine variant="h6" persistent>
                {title}
              </TextMaxLine>
            </Link>

            <TextMaxLine variant="body2" line={3} persistent>
              {description}
            </TextMaxLine>
          </Stack>
        </Stack>

        <Divider
          sx={{
            borderStyle: 'dashed',
            display: { sm: 'none' },
            ...(vertical && {
              display: 'block',
            }),
          }}
        />

        <Stack
          direction="row"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="space-between"
          sx={{ color: 'text.disabled', '& > *:not(:last-child)': { mr: 2.5 } }}
        >
          <Button
            component="a"
            href={buyHref}
            variant="contained"
            size="small"
            color="secondary"
            sx={{ ml: 'auto' }}
          >
            {ctaLabel || 'Buy now'}
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}

ElearningPublicCourseItem.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.any,
    attributes: PropTypes.shape({
      title: PropTypes.string,
      price: PropTypes.number,
      description: PropTypes.string,
      image: PropTypes.string,
      slug: PropTypes.string,
      ctaLabel: PropTypes.string,
      priceLabel: PropTypes.string,
      courseCount: PropTypes.number,
      catalogType: PropTypes.string,
    }),
  }),
  vertical: PropTypes.bool,
};
