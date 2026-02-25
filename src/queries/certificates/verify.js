import axios from 'axios';

const apiEndpoint = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api`;

export const getVerifyCertificateData = async (id) => {
  try {
    // Calling the newly created public REST endpoint directly
    const { data } = await axios.get(`${apiEndpoint}/user-certificates/verify/${id}`);
    return data;
  } catch (error) {
    console.error('Error fetching verification data', error);
    throw error;
  }
};
