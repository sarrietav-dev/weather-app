import { Handler } from '@netlify/functions';
import axios from 'axios';

const handler: Handler = async () => {
  let latitude: number, longitude: number;
  navigator.geolocation.getCurrentPosition((position) => {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
  });
  const { API_KEY } = process.env;

  const response = await axios.get(
    'https://api.openweathermap.org/data/2.5/weather',
    {
      params: {
        lat: latitude,
        lon: longitude,
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
