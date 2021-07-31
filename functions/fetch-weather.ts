import { Handler } from '@netlify/functions';
import axios from 'axios';

const handler: Handler = async (event) => {
  const { lat, lon } = event.queryStringParameters;

  const { API_KEY } = process.env;

  const response = await axios.get(
    'https://api.openweathermap.org/data/2.5/weather',
    {
      params: {
        lat: lat,
        lon: lon,
        appid: API_KEY,
        units: 'metric',
      },
    },
  );

  return {
    statusCode: 200,
    body: JSON.stringify(response.data),
  };
};

export { handler };
