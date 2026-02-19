'use client';

import { useQuery } from 'react-query';

import { _testimonials } from 'src/_mock';
import { getAboutUsData } from 'src/queries/aboutUs/index';

import ElearningNewsletter from '../elearning-newsletter';
import ElearningAboutHero from '../about/elearning-about-hero';
import ElearningPrivacy from '../landing/elearning-privacy-about';
import ElearningLandingAbout from '../landing/elearning-landing-about';
import ElearningTestimonial from '../testimonial/elearning-testimonial';

// ----------------------------------------------------------------------

export default function ElearningAboutView() {
  const { data: aboutUsData, isLoading } = useQuery(['aboutUsData'], () => getAboutUsData());

  return (
    <>
      <ElearningAboutHero {...aboutUsData?.heroData} />
      <ElearningLandingAbout {...aboutUsData?.aboutData} />
      <ElearningPrivacy privacyData={aboutUsData?.privacy} securityData={aboutUsData?.security} />

      {/* <ElearningAbout /> */}

      {/* <ElearningAboutCoreValues /> */}

      {/* <TeamElearningAbout members={_members} /> */}

      {/* <ElearningOurClients brands={_brandsColor} /> */}

      <ElearningTestimonial testimonials={_testimonials} />

      {/* <ElearningLatestPosts posts={_coursePosts.slice(0, 4)} /> */}

      <ElearningNewsletter />
    </>
  );
}
