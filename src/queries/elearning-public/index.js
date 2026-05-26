// ----------------------------------------------------------------------
// Public catalog fetchers for the kept marketing surfaces (/e-learning/courses
// and /e-learning/course). These hit the new platform's public API at
// api.ryzolve.app instead of the legacy Strapi GraphQL backend.
//
// Responses are adapted to the legacy `{ id, attributes: {...} }` shape so the
// existing list/detail components don't need a structural rewrite.
// ----------------------------------------------------------------------

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://api.ryzolve.app';

const minutesToHours = (minutes) => {
  if (typeof minutes !== 'number' || minutes <= 0) return 0;
  return Math.round((minutes / 60) * 10) / 10;
};

const centsToDollars = (cents) => {
  if (typeof cents !== 'number') return 0;
  return Math.round(cents) / 100;
};

const adaptCourseListItem = (item) => ({
  id: item.slug, // use slug as id so links to /e-learning/course?slug=... work
  attributes: {
    title: item.title || '',
    description: item.description || '',
    image: item.thumbnailUrl || '',
    price: centsToDollars(item.priceCents),
    priceSale: 0,
    bestSeller: false,
    time: minutesToHours(item.durationMinutes),
    rating: 0,
    totalReviews: 0,
    totalStudents: 0,
    category: { data: { attributes: { name: '' } } },
    users: { data: [] },
    // raw slug for outbound links to the new platform
    slug: item.slug,
  },
});

const adaptCourseDetail = ({ course, pkg }) => ({
  id: course.slug,
  attributes: {
    title: course.title || '',
    description: course.description || '',
    image: course.thumbnailUrl || '',
    price: centsToDollars(pkg?.priceCents),
    priceSale: 0,
    bestSeller: false,
    time: minutesToHours(course.durationMinutes),
    rating: 0,
    totalReviews: 0,
    totalStudents: 0,
    category: { data: { attributes: { name: '' } } },
    units: { data: [] },
    quiz: [],
    resources: 0,
    users: { data: [] },
    WhatYouWillLearn: (course.learningOutcomes || []).map((point, idx) => ({
      id: `outcome-${idx}`,
      points: point,
    })),
    WhatDoesThisCourseCover: [],
    Skills: (course.skills || []).map((point, idx) => ({
      id: `skill-${idx}`,
      points: point,
    })),
    slug: course.slug,
  },
});

export const getPublicCoursesData = async () => {
  const res = await fetch(`${API_BASE}/public/courses?limit=100`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch public courses: ${res.status}`);
  }
  const json = await res.json();
  const items = json?.data?.items ?? [];
  return items.map(adaptCourseListItem);
};

export const getPublicCourseData = async (slug) => {
  if (!slug) {
    throw new Error('getPublicCourseData: slug is required');
  }
  const res = await fetch(`${API_BASE}/public/courses/${encodeURIComponent(slug)}`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch public course "${slug}": ${res.status}`);
  }
  const json = await res.json();
  const course = json?.data?.course;
  const pkg = json?.data?.package;
  if (!course) return null;
  return adaptCourseDetail({ course, pkg });
};

// External link target on the new platform. ?auto=1 triggers Stripe checkout
// immediately on hydration if the user is already signed in there.
export const getNewPlatformCourseUrl = (slug, { autoBuy = false } = {}) => {
  const base = 'https://learn.ryzolve.app/courses';
  if (!slug) return base;
  return autoBuy
    ? `${base}/${encodeURIComponent(slug)}?auto=1`
    : `${base}/${encodeURIComponent(slug)}`;
};
