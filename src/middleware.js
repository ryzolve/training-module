import { NextResponse } from 'next/server';

// ----------------------------------------------------------------------
// Cutover redirects: app routes (auth, account, courses consumption,
// payments, certificate verify) all hop to learn.ryzolve.app.
// Marketing surfaces (homepage, /about-us, /contact, /career/*, /e-learning/*)
// remain on this domain — see the matcher exclusion below.
// Order matters: /auth/register before /auth so the more-specific match wins.
// ----------------------------------------------------------------------

const APP_ROUTE_PATTERNS = [
  // Auth
  { match: /^\/auth\/register(?:\/|$)/, to: 'https://learn.ryzolve.app/auth/register' },
  {
    match: /^\/auth\/forgot-password(?:\/|$)/,
    to: 'https://learn.ryzolve.app/auth/forgot-password',
  },
  {
    match: /^\/auth\/reset-password(?:\/|$)/,
    to: 'https://learn.ryzolve.app/auth/reset-password',
  },
  { match: /^\/auth(?:\/|$)/, to: 'https://learn.ryzolve.app/auth/login' },

  // Account / dashboard / learner consumption
  { match: /^\/account(?:\/|$)/, to: 'https://learn.ryzolve.app/settings' },
  { match: /^\/my-learning(?:\/|$)/, to: 'https://learn.ryzolve.app/my-courses' },

  // Course consumption — legacy id-based URLs map to slug-based on new platform.
  // Lossy fallback: route to the catalog list on the new platform.
  { match: /^\/courses(?:\/|$)/, to: 'https://learn.ryzolve.app/courses' },
  { match: /^\/lesson(?:\/|$)/, to: 'https://learn.ryzolve.app/my-courses' },
  { match: /^\/quiz(?:\/|$)/, to: 'https://learn.ryzolve.app/my-courses' },

  // Payment / checkout / cart / wishlist — converge to catalog on the new platform.
  { match: /^\/checkout(?:\/|$)/, to: 'https://learn.ryzolve.app/courses' },
  { match: /^\/cart(?:\/|$)/, to: 'https://learn.ryzolve.app/courses' },
  { match: /^\/wishlist(?:\/|$)/, to: 'https://learn.ryzolve.app/courses' },
  { match: /^\/payment(?:\/|$)/, to: 'https://learn.ryzolve.app/courses' },
  {
    match: /^\/purchase-completed(?:\/|$)/,
    to: 'https://learn.ryzolve.app/checkout/success',
  },
  { match: /^\/renewal(?:\/|$)/, to: 'https://learn.ryzolve.app/my-courses' },

  // Certificate verification — legacy /verify/[id] -> /certificates/verify on new platform
  { match: /^\/verify(?:\/|$)/, to: 'https://learn.ryzolve.app/certificates/verify' },
];

export function middleware(req) {
  const { pathname } = req.nextUrl;

  const hit = APP_ROUTE_PATTERNS.find(({ match }) => match.test(pathname));
  if (hit) {
    return NextResponse.redirect(hit.to, 308);
  }

  return NextResponse.next();
}

export const config = {
  // Run on every request EXCEPT:
  //   - _next/* (build assets)
  //   - favicon.ico
  //   - any path that contains a "." (static files: images, fonts, sitemap.xml, robots.txt, etc.)
  //   - /e-learning/* (kept marketing surface, rewired to new public API)
  //   - /about-us, /contact, /career/* are NOT excluded here because none of the
  //     APP_ROUTE_PATTERNS above match them — they pass through to NextResponse.next().
  matcher: ['/((?!_next|favicon.ico|.*\\..*|e-learning).*)'],
};
