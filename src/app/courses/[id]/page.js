import PropTypes from 'prop-types';
import { redirect } from 'next/navigation';

// Legacy Strapi course URLs now point to the public course detail page backed
// by the new platform catalog.
export default function ElearningCoursePage({ params }) {
  redirect(`/e-learning/course?slug=${encodeURIComponent(params.id)}`);
}

ElearningCoursePage.propTypes = {
  params: PropTypes.object,
};
