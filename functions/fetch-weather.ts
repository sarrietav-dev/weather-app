import { Handler } from '@netlify/functions';
import axios from 'axios';

const handler: Handler = async (event) => {
  const { lat, lon } = event.queryStringParameters;

  const { WEATHER_API_KEY } = process.env;

  const response = await axios.get(
    'https://api.openweathermap.org/data/2.5/weather',
    {
      params: {
        lat: lat,
        lon: lon,
        appid: WEATHER_API_KEY,
        units: 'metric',
      },
    },
  );

  return {
    statusCode: 200,
    body: JSON.stringify(response.data),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};

export { handler };
