'use client';

import PropTypes from 'prop-types';
import { useQuery } from 'react-query';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CancelIcon from '@mui/icons-material/Cancel';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { getCertificateData } from 'src/queries/certificates';
import Certificate from 'src/sections/certificate/certificate';
import { getVerifyCertificateData } from 'src/queries/certificates/verify';

// ----------------------------------------------------------------------

export default function VerifyCertificateView({ id }) {
  const {
    data: verifyResult,
    isLoading: isLoadingVerify,
    isError: isVerifyError,
  } = useQuery(['verifyCertificate', id], () => getVerifyCertificateData(id), {
    retry: false,
  });

  const { data: certificateNames } = useQuery('certificateNames', getCertificateData);

  const verificationData = verifyResult?.data;
  
  const isValid = verificationData?.attributes?.status === 'active';

  const renderContent = () => {
    if (isLoadingVerify) {
      return (
        <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 400 }}>
          <CircularProgress size={64} />
          <Typography variant="h6" sx={{ mt: 3 }}>
            Verifying Certificate...
          </Typography>
        </Stack>
      );
    }

    if (isVerifyError || !verificationData) {
      return (
        <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 400, textAlign: 'center' }}>
          <CancelIcon color="error" sx={{ fontSize: 80, mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Certificate Not Found
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
            We could not find a valid certificate with this identifier. It may have been deleted or the link is incorrect.
          </Typography>
          <Button component={RouterLink} href={paths.eLearning.courses} size="large" variant="contained" color="primary">
            Browse Courses
          </Button>
        </Stack>
      );
    }

    // Format dates safely
    const issuedDate = new Date(verificationData.attributes.issuedDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    
    const expiryDate = new Date(verificationData.attributes.expiryDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return (
      <Stack spacing={5} alignItems="center">
        {/* Status Header */}
        <Stack
          spacing={2}
          alignItems="center"
          sx={{
            p: 4,
            width: '100%',
            maxWidth: 600,
            borderRadius: 2,
            bgcolor: isValid ? 'success.lighter' : 'error.lighter',
            textAlign: 'center',
          }}
        >
          {isValid ? (
            <CheckCircleIcon color="success" sx={{ fontSize: 64 }} />
          ) : (
            <CancelIcon color="error" sx={{ fontSize: 64 }} />
          )}
          
          <Typography variant="h3" sx={{ color: isValid ? 'success.darker' : 'error.darker' }}>
            {isValid ? 'Authentic & Valid Certificate' : 'Certificate Expired'}
          </Typography>
          
          <Typography variant="body1" sx={{ color: isValid ? 'success.dark' : 'error.dark' }}>
            This certificate was issued to <strong>{verificationData.attributes.firstname} {verificationData.attributes.lastname}</strong> for successfully completing the course <strong>{verificationData.attributes.courseTitle}</strong>.
          </Typography>
        </Stack>

        {/* Details Grid */}
        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
          }}
          sx={{ width: '100%', maxWidth: 600 }}
        >
          <Stack spacing={1}>
            <Typography variant="overline" sx={{ color: 'text.disabled' }}>Issued On</Typography>
            <Typography variant="subtitle1">{issuedDate}</Typography>
          </Stack>

          <Stack spacing={1}>
            <Typography variant="overline" sx={{ color: 'text.disabled' }}>Valid Until</Typography>
            <Typography variant="subtitle1">{expiryDate}</Typography>
          </Stack>
          
          <Stack spacing={1}>
            <Typography variant="overline" sx={{ color: 'text.disabled' }}>Current Status</Typography>
            <Typography 
              variant="subtitle1" 
              sx={{ color: isValid ? 'success.main' : 'error.main', fontWeight: 'bold', textTransform: 'capitalize' }}
            >
              {verificationData.attributes.status.replace('_', ' ')}
            </Typography>
          </Stack>

          <Stack spacing={1}>
            <Typography variant="overline" sx={{ color: 'text.disabled' }}>Certificate ID</Typography>
            <Typography variant="subtitle1" sx={{ fontFamily: 'monospace' }}>{verificationData.id}</Typography>
          </Stack>
        </Box>

        {/* Digital Preview */}
        {certificateNames && (
          <Box sx={{ mt: 5, width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Box
              sx={{
                transform: { xs: 'scale(0.3)', sm: 'scale(0.5)', md: 'scale(0.7)', lg: 'scale(0.8)' },
                transformOrigin: 'top center',
                height: { xs: 260, sm: 420, md: 580, lg: 650 },
                pointerEvents: 'none', // Make it read-only
                mt: { xs: 4, md: 8 }, // Add top margin to prevent clipping
              }}
            >
              <Certificate
                certificateData={verificationData}
                certificateNames={certificateNames?.data?.certificates?.data?.[0]?.attributes?.certificate}
                userData={{
                  firstname: verificationData.attributes.firstname,
                  lastname: verificationData.attributes.lastname,
                  username: verificationData.attributes.username,
                }}
              />
            </Box>
          </Box>
        )}
      </Stack>
    );
  };

  return (
    <Container sx={{ py: { xs: 8, md: 10 } }}>
      {renderContent()}
    </Container>
  );
}

VerifyCertificateView.propTypes = {
  id: PropTypes.string,
};
