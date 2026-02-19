import { useQuery } from 'react-query';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Accordion from '@mui/material/Accordion';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { axiosClient } from 'src/utils/axiosClient';
import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

export default function ElearningLandingFaqs() {
  const mdUp = useResponsive('up', 'md');

  const [expanded, setExpanded] = useState(false);

  const getFaqs = () => {
    const response = axiosClient.get('/api/faqs?populate=*');
    return response;
  };

  const { data: faqs, isLoading } = useQuery({
    queryKey: ['faqs'],
    queryFn: getFaqs,
  });

  // console.log('faqs', faqs);

  const faqsData = faqs?.data.data.map((list) => list.attributes.faq).flat();
  console.log(faqsData);

  const handleChangeExpanded = useCallback(
    (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    },
    []
  );

  return (
    <Box sx={{ bgcolor: 'background.neutral' }}>
      <Container
        sx={{
          pt: { xs: 5, md: 10 },
          pb: { xs: 10, md: 15 },
        }}
      >
        <Grid container spacing={3} justifyContent="space-between" alignItems="center">
          <Grid xs={12} md={6} lg={6}>
            <Stack spacing={2} sx={{ mb: 5, textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="overline" color="text.disabled">
                FAQS
              </Typography>

              <Typography variant="h2">Frequently asked questions</Typography>
            </Stack>

            {faqsData?.map((faq) => (
              <Accordion
                key={faq.id}
                expanded={expanded === faq.question}
                onChange={handleChangeExpanded(faq.question)}
              >
                <AccordionSummary
                  sx={{
                    minHeight: 64,
                    [`& .${accordionSummaryClasses.content}`]: {
                      p: 0,
                      m: 0,
                    },
                    [`&.${accordionSummaryClasses.expanded}`]: {
                      bgcolor: 'action.selected',
                    },
                  }}
                >
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    {faq.question}
                  </Typography>

                  <Iconify
                    width={24}
                    icon={expanded === faq.question ? 'carbon:subtract' : 'carbon:add'}
                  />
                </AccordionSummary>

                <AccordionDetails>{faq.answer}</AccordionDetails>
              </Accordion>
            ))}
          </Grid>

          {mdUp && (
            <Grid xs={12} md={6} lg={5}>
              <Image alt="faqs" src="/assets/illustrations/illustration_faqs.svg" />
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
