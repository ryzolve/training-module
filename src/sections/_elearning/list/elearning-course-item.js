import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import Image from 'src/components/image';
import Label from 'src/components/label';
import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { useCartStore } from 'src/states/cart';
import { RouterLink } from 'src/routes/components';
import { useUserStore } from 'src/states/auth-store';
import TextMaxLine from 'src/components/text-max-line';
import { useWishlistStore } from 'src/states/wishlist';
import { fCurrency, fShortenNumber } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export default function ElearningCourseItem({ course, vertical, isMyLearning, configuration }) {
  const { id } = course;

  const {
    title,
    price,
    category,
    priceSale,
    bestSeller,
    time,
    description,
    rating,
    totalReviews,
    totalStudents,
    users,
    image,
  } = course.attributes;

  const [cart, addToCart, removeFromCart] = useCartStore((state) => [
    state.cart,
    state.addToCart,
    state.removeFromCart,
  ]);

  const [wishlist, addToWishlist, removeFromWishlist] = useWishlistStore((state) => [
    state.wishlist,
    state.addToWishlist,
    state.removeFromWishlist,
  ]);

  const userData = useUserStore((state) => state.UserData);

  const { isLoggedIn } = userData;

  const hasBoughtCourse =
    isLoggedIn &&
    users.data?.filter((user) => user.id.toString() === userData.id.toString()).length > 0;

  const isCourseInCart = cart.filter((cartItem) => cartItem.id === id).length === 0;

  const isCourseInWishlist = wishlist.filter((wishlistItem) => wishlistItem.id === id).length === 0;

  const wishlistIcon = isCourseInWishlist ? 'solar:heart-linear' : 'solar:heart-bold';

  const usersCount = users.data ? users.data.length : users.length;

  return (
    <Card
      sx={{
        display: { sm: 'flex' },
        '&:hover': {
          boxShadow: (theme) => theme.customShadows.z24,
        },
        ...(vertical && {
          flexDirection: 'column',
        }),
      }}
    >
      <Box sx={{ flexShrink: { sm: 0 } }}>
        <Image
          alt={title}
          src={image}
          sx={{
            height: 1,
            // objectFit: 'cover',
            width: { sm: 240, md: 270 },
            ...(vertical && {
              width: { sm: 1 },
            }),
          }}
        />
      </Box>

      {bestSeller && (
        <Label
          color="warning"
          variant="filled"
          sx={{
            top: 12,
            left: 12,
            position: 'absolute',
            textTransform: 'uppercase',
          }}
        >
          Best Seller
        </Label>
      )}

      <Stack spacing={3} sx={{ p: 3 }} width="100%">
        <Stack
          spacing={{
            xs: 3,
            sm: vertical ? 3 : 1,
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="overline" sx={{ color: 'primary.main' }}>
              {category?.data?.attributes.name}
            </Typography>

            <Typography variant="h4">
              {priceSale > 0 && (
                <Box
                  component="span"
                  sx={{
                    mr: 0.5,
                    color: 'text.disabled',
                    textDecoration: 'line-through',
                  }}
                >
                  {fCurrency(priceSale)}
                </Box>
              )}
              {fCurrency(price)}
            </Typography>
          </Stack>

          <Stack spacing={1}>
            <Link component={RouterLink} href={`/courses/${id}`} color="inherit">
              <TextMaxLine variant="h6">{title}</TextMaxLine>
            </Link>

            <TextMaxLine
              variant="body2"
              // color="text.secondary"
              sx={{
                ...(vertical && {
                  display: { sm: 'none' },
                }),
              }}
            >
              {description}
            </TextMaxLine>
          </Stack>
        </Stack>

        <Stack
          spacing={1.5}
          direction="row"
          alignItems="center"
          flexWrap="wrap"
          divider={<Divider orientation="vertical" sx={{ height: 20, my: 'auto' }} />}
        >
          {/* <Stack spacing={0.5} direction="row" alignItems="center">
            <Iconify icon="carbon:star-filled" sx={{ color: 'warning.main' }} />
            <Box sx={{ typography: 'h6' }}>{Number.isInteger(rating) ? `${rating}.0` : rating}</Box>

            {totalReviews && (
              <Link variant="body2" sx={{ color: 'text.secondary' }}>
                ({fShortenNumber(totalReviews)} totalReviews)
              </Link>
            )}
          </Stack> */}

          {configuration?.data.data.attributes.enrolledstudents && (
            <Stack
              direction="row"
              alignItems="center"
              spacing={1.2}
              divider={<Divider orientation="vertical" sx={{ height: 18 }} />}
            >
              <Iconify icon="heroicons-outline:users" />
              <Typography sx={{ fontSize: 14 }}>
                {' '}
                {fShortenNumber(usersCount)} {usersCount === 1 ? 'student' : 'students'} enrolled
              </Typography>
            </Stack>
          )}
        </Stack>

        {/* <Stack direction="row" alignItems="center">
          <Avatar src={teachers[0]?.avatarUrl} />

          <Typography variant="body2" sx={{ ml: 1, mr: 0.5 }}>
            {teachers[0]?.name}
          </Typography>

          {teachers?.length > 0 && (
            <Link underline="always" color="text.secondary" variant="body2">
              + {teachers?.length} teachers
            </Link>
          )}
        </Stack> */}

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
          alignItems="space-around"
          justifyContent="space-between"
          sx={{ color: 'text.disabled', '& > *:not(:last-child)': { mr: 2.5 } }}
        >
          <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
            <Iconify icon="carbon:time" sx={{ mr: 1 }} /> {`${time} hours`}
          </Stack>

          {/* <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
            <Iconify
              icon={
                (level === 'Beginner' && 'carbon:skill-level-basic') ||
                (level === 'Intermediate' && 'carbon:skill-level-intermediate') ||
                'carbon:skill-level-advanced'
              }
              sx={{ mr: 1 }}
            />
            {level}
          </Stack> */}

          {isMyLearning || hasBoughtCourse ? (
              <Stack direction="column" spacing={1} sx={{ width: 1 }}>
                <Link
                  component={RouterLink}
                  href={`${paths.eLearning.courses}/${id}`}
                  color="inherit"
                >
                  <Button variant="outlined" size="small" color="inherit" sx={{ width: 1 }}>
                    Go to Course
                  </Button>
                </Link>
              </Stack>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
              >
                <IconButton
                  variant={isCourseInWishlist ? 'contained' : 'outlined'}
                  size="large"
                  color="inherit"
                  onClick={() =>
                    isCourseInWishlist ? addToWishlist(course) : removeFromWishlist(course)
                  }
                >
                  <Iconify icon={wishlistIcon} color="red" />
                </IconButton>

                <IconButton
                  variant={isCourseInCart ? 'contained' : 'outlined'}
                  size="large"
                  color="inherit"
                  onClick={() => (isCourseInCart ? addToCart(course) : removeFromCart(course))}
                >
                  {isCourseInCart ? (
                    <Iconify icon="carbon:shopping-cart-plus" />
                  ) : (
                    <Iconify icon="carbon:shopping-cart-minus" />
                  )}
                </IconButton>
              </Box>
            )}
        </Stack>
      </Stack>
    </Card>
  );
}

ElearningCourseItem.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.any,
    attributes: PropTypes.shape({
      title: PropTypes.string,
      price: PropTypes.number,
      category: PropTypes.object,
      priceSale: PropTypes.number,
      bestSeller: PropTypes.bool,
      time: PropTypes.number,
      description: PropTypes.string,
      rating: PropTypes.number,
      totalReviews: PropTypes.number,
      totalStudents: PropTypes.number,
      users: PropTypes.any,
      image: PropTypes.string,
    }),
  }),
  vertical: PropTypes.bool,
  isMyLearning: PropTypes.bool,
  configuration: PropTypes.any,
};
