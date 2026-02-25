import PropTypes from 'prop-types';

import MainLayout from 'src/layouts/main';
import VerifyCertificateView from 'src/sections/certificate/verify-certificate-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Verify Certificate - Ryzolve',
};

export default function VerifyCertificatePage({ params }) {
  const { id } = params;

  return (
    <MainLayout>
      <VerifyCertificateView id={id} />
    </MainLayout>
  );
}

VerifyCertificatePage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
};
