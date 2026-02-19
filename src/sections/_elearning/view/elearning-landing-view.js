'use client';

import Link from 'next/link';
import { useQuery } from 'react-query';
import { useState, useEffect } from 'react';

import { Box, Modal, Button, Typography } from '@mui/material';

import { _testimonials } from 'src/_mock';
import Iconify from 'src/components/iconify';
import { axiosClient } from 'src/utils/axiosClient';

import ElearningNewsletter from '../elearning-newsletter';
import ElearningLandingFaqs from '../landing/elearning-landing-faqs';
import ElearningLandingHero from '../landing/elearning-landing-hero';
import ElearningTestimonial from '../testimonial/elearning-testimonial';
// import ElearningLatestPosts from '../../blog/elearning/elearning-latest-posts';
import ElearningLandingFeaturedCourses from '../landing/elearning-landing-featured-courses';

import ElearningLandingProcess from './elearning-landing-process';
import ElearningLandingServices from './elearning-landing-services';

// ----------------------------------------------------------------------

export default function ElearningLandingView() {
  const [open, setOpen] = useState(false);

  const adminConfiguration = () => {
    const response = axiosClient.get('/api/configuration?populate=*');
    return response;
  };

  const { data: configuration, isLoading } = useQuery({
    queryKey: ['configuration'],
    queryFn: adminConfiguration,
  });

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, 3000);
  }, []);

  console.log('configuration', configuration);

  return (
    <>
      {/* pop up */}
      {configuration?.data.data.attributes.popup && (
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              height: 200,
              // bgcolor: '#ffffff',
              bgcolor: 'white',
              // border: '2px solid #000',
              // boxShadow: 24,
              p: 1,
              borderRadius: 2,
            }}
          >
            <Button
              sx={{ left: '85%', color: 'red', borderRadius: 80 }}
              onClick={() => handleClose()}
            >
              <Iconify
                icon="carbon:close"
                width="25px"
                height="25px"
                sx={{ color: 'red', left: '85%' }}
              />
            </Button>
            <Box sx={{ p: 1, color: 'black', textAlign: 'center' }}>
              <Typography
                id="modal-modal-title"
                variant="h4"
                sx={{ color: '#0D5992', fontWeight: 'bold' }}
              >
                New Year Sale
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Buy now to get 20% discount.
              </Typography>
            </Box>

            <Link href="/courses">
              <Button sx={{ left: '40%', bgcolor: '#FF774C', mt: 1, color: 'black' }}>
                Buy Now
              </Button>
            </Link>
          </Box>
        </Modal>
      )}

      {/* pop up end */}

      <ElearningLandingHero />
      <ElearningLandingFeaturedCourses configuration={configuration} />

      <ElearningLandingServices />

      <ElearningLandingProcess />

      <ElearningTestimonial testimonials={_testimonials} />

      <ElearningLandingFaqs />

      {configuration?.data.data.attributes.coupons.active && <ElearningNewsletter />}
    </>
  );
}
