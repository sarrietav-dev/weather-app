import { Handler } from '@netlify/functions';
import axios from 'axios';

const handler: Handler = async () => {
  const { GEOLOC_API_KEY } = process.env;

  const response = await axios.get('https://api.ipgeolocation.io/ipgeo', {
    params: { apiKey: GEOLOC_API_KEY },
  });

  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(response.data),
  };
};

export { handler };
