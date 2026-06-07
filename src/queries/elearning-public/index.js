// ----------------------------------------------------------------------
// Public catalog fetchers for the kept marketing surfaces (/e-learning/courses
// and /e-learning/course). These hit the new platform's public API at
// api.ryzolve.app instead of the legacy Strapi GraphQL backend.
//
// Responses are adapted to the legacy `{ id, attributes: {...} }` shape so the
// existing list/detail components don't need a structural rewrite.
// ----------------------------------------------------------------------

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://api.ryzolve.app';
const LEARN_APP_BASE = 'https://learn.ryzolve.app';
const AGENCY_APP_BASE = 'https://agency.ryzolve.app';
const AGENCY_PACKAGE_IMAGE = '/assets/illustrations/illustration_courses_hero.svg';

const centsToDollars = (cents) => {
  if (typeof cents !== 'number') return 0;
  return Math.round(cents) / 100;
};

const formatDollars = (cents) => `$${centsToDollars(cents)}`;

const fetchJson = async (path) => {
  const res = await fetch(`${API_BASE}${path}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    const error = new Error(`Failed to fetch ${path}: ${res.status}`);
    error.status = res.status;
    throw error;
  }

  return res.json();
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
    rating: 0,
    totalReviews: 0,
    totalStudents: 0,
    category: { data: { attributes: { name: '' } } },
    users: { data: [] },
    // raw slug for outbound links to the new platform
    slug: item.slug,
    catalogType: 'individual_course',
    ctaLabel: 'Buy now',
  },
});

const adaptTrainingPackageListItem = (item) => ({
  id: `package-${item.slug}`,
  attributes: {
    title: item.name || '',
    description: item.description || '',
    image: AGENCY_PACKAGE_IMAGE,
    price: 0,
    priceSale: 0,
    priceLabel: 'Agency plans',
    bestSeller: false,
    rating: 0,
    totalReviews: 0,
    totalStudents: 0,
    category: { data: { attributes: { name: '' } } },
    users: { data: [] },
    slug: item.slug,
    packageId: item.id,
    courseCount: item.courseCount,
    validityMonths: item.validityMonths,
    catalogType: 'agency_bundle',
    ctaLabel: 'View plans',
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
    catalogType: 'individual_course',
    ctaLabel: 'Buy now',
  },
});

const adaptTrainingPackageDetail = (item, plans = []) => {
  const sortedPlans = [...plans].sort((a, b) => a.monthlyPriceCents - b.monthlyPriceCents);
  const lowestPlan = sortedPlans[0];
  const featurePoints = sortedPlans.flatMap((plan) => plan.features || []);
  const adaptedPlans = sortedPlans.map((plan) => ({
    id: plan.id,
    name: plan.name || '',
    description: plan.description || '',
    features: plan.features || [],
    maxLearners: plan.maxLearners,
    monthlyPriceCents: plan.monthlyPriceCents,
    priceLabel: `${formatDollars(plan.monthlyPriceCents)}/mo`,
    isFeatured: !!plan.isFeatured,
    buyHref: getNewPlatformCourseUrl(item.slug, {
      catalogType: 'agency_bundle',
      packageId: item.id,
      planId: plan.id,
    }),
  }));

  return {
    id: `package-${item.slug}`,
    attributes: {
      title: item.name || '',
      description: item.description || '',
      image: AGENCY_PACKAGE_IMAGE,
      price: centsToDollars(lowestPlan?.monthlyPriceCents),
      priceSale: 0,
      priceLabel: lowestPlan
        ? `From ${formatDollars(lowestPlan.monthlyPriceCents)}/mo`
        : 'Agency plans',
      bestSeller: false,
      rating: 0,
      totalReviews: 0,
      totalStudents: 0,
      category: { data: { attributes: { name: '' } } },
      units: { data: [] },
      quiz: [],
      resources: 0,
      users: { data: [] },
      WhatYouWillLearn: [
        item.courseCount
          ? `${item.courseCount} included courses for agency learners`
          : 'A curated in-service training package for agencies',
        'Learner access and progress tracking continue on the new agency platform',
        'Subscription plans are selected during agency signup',
      ].map((point, idx) => ({
        id: `package-outcome-${idx}`,
        points: point,
      })),
      WhatDoesThisCourseCover: [],
      Skills: [...new Set(featurePoints)].map((point, idx) => ({
        id: `package-skill-${idx}`,
        points: point,
      })),
      slug: item.slug,
      packageId: item.id,
      courseCount: item.courseCount,
      validityMonths: item.validityMonths,
      plans: adaptedPlans,
      catalogType: 'agency_bundle',
      ctaLabel: 'View agency plans',
    },
  };
};

export const getPublicCoursesData = async () => {
  const [coursesResult, packagesResult] = await Promise.allSettled([
    fetchJson('/public/courses?limit=100'),
    fetchJson('/training-packages/public'),
  ]);

  const courseItems =
    coursesResult.status === 'fulfilled' ? coursesResult.value?.data?.items ?? [] : [];
  const packageItems =
    packagesResult.status === 'fulfilled' ? packagesResult.value?.data ?? [] : [];

  if (coursesResult.status === 'rejected' && packagesResult.status === 'rejected') {
    throw coursesResult.reason;
  }

  return [
    ...packageItems.map(adaptTrainingPackageListItem),
    ...courseItems.map(adaptCourseListItem),
  ];
};

export const getPublicCourseData = async (slug) => {
  if (!slug) {
    throw new Error('getPublicCourseData: slug is required');
  }

  try {
    const json = await fetchJson(`/public/courses/${encodeURIComponent(slug)}`);
    const course = json?.data?.course;
    const pkg = json?.data?.package;
    if (course) return adaptCourseDetail({ course, pkg });
  } catch (error) {
    if (error.status !== 404) throw error;
  }

  const packagesJson = await fetchJson('/training-packages/public');
  const packageItem = (packagesJson?.data ?? []).find((item) => item.slug === slug);
  if (!packageItem) return null;

  const plansJson = await fetchJson(`/subscription-plans/public?packageId=${packageItem.id}`);
  return adaptTrainingPackageDetail(packageItem, plansJson?.data ?? []);
};

// External link targets on the new platform. Individual course links can pass
// ?auto=1 to trigger checkout there; agency packages use the agency signup flow.
export const getNewPlatformCourseUrl = (
  slug,
  { autoBuy = false, catalogType, packageId, planId } = {}
) => {
  if (catalogType === 'agency_bundle') {
    const params = new URLSearchParams();
    if (packageId) params.set('packageId', String(packageId));
    if (planId) params.set('planId', String(planId));
    const query = params.toString();
    return `${AGENCY_APP_BASE}/auth/register${query ? `?${query}` : ''}`;
  }

  const base = `${LEARN_APP_BASE}/courses`;
  if (!slug) return base;
  return autoBuy
    ? `${base}/${encodeURIComponent(slug)}?auto=1`
    : `${base}/${encodeURIComponent(slug)}`;
};
