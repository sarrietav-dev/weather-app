<template>
  <div :class="getBgColor" id="background">
    <header>
      <p class="date">{{ getDate }}</p>
      <p class="time">{{ getHour }}</p>
      <p class="location">{{ location }}</p>
    </header>
    <img :src="getSVGsrc" class="weather-icon" />
    <p class="temperature">{{ temperature }} °C</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  CurrentWeatherDataResponse,
  WeatherCondition,
} from './types/weather-api';
import axios from 'axios';

interface AppState {
  location: string;
  weather: {
    main: WeatherCondition;
    description: string;
  };
  temperature: number;
}

export default defineComponent({
  name: 'App',
  data(): AppState {
    return {
      location: 'Cartagena',
      weather: {
        main: 'Clear',
        description: 'Very clear',
      },
      temperature: 200,
    };
  },
  computed: {
    getBgColor(): string {
      return this.weather.main.toLowerCase();
    },
    getDate() {
      const date = new Date();
      const month = date.toLocaleString('default', { month: 'long' });
      const weekday = date.toLocaleString('default', { weekday: 'long' });

      return `${weekday}, ${date.getDate()} ${month}`;
    },
    getHour() {
      const date = new Date();
      return `${date.getHours()}:${date.getMinutes()}`;
    },
    getSVGsrc() {
      if (this.weather.main === 'Rain') return require('@/assets/rain.svg');
      if (this.weather.main === 'Thunderstorm')
        return require('@/assets/thunderstorm.svg');
      if (this.weather.main === 'Snow') return require('@/assets/snow.svg');
      if (this.weather.main === 'Clear')
        return require('@/assets/day-sunny.svg');
      return require('@/assets/day-cloudy.svg');
    },
  },
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getApiPromise() {
  Date.prototype.toLocaleString('default', { weekday: 'long' });

  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    axios
      .get<CurrentWeatherDataResponse>(
        `api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=8e71173fd511d2582e29c50306f73b14`,
      )
      .then(() => {
        //this.temperature = response.data.main.temp;
        //this.location = response.data.name;
        //const { main, description } = response.data.weather[0];
        //this.weather = { main, description };
      })
      .catch((err) => console.error(err));
  });
}
</script>

<style lang="scss">
@import 'variables.scss';

*,
*::before,
*::after {
  padding: 0;
  margin: 0;
  box-sizing: inherit;
}

:root {
  font-size: 62.5%;
  box-sizing: border-box;
}

body {
  height: 100vh;
  color: #fff;
  font-family: 'Roboto', sans-serif;
}

#app,
#background {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  font-size: 2rem;

  header {
    & > * {
      margin: 1rem 0;
    }

    text-align: center;
    .time {
      font-size: 4rem;
    }
  }

  .weather-icon {
    width: 15%;
    filter: brightness(300%);
  }

  .temperature {
    font-size: 4rem;
  }
}

.clear {
  background-image: $sunny-bg-color;

  .weather-icon {
    animation: spin 4s linear infinite;
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
}

.clouds,
.atmosphere,
.rain,
.drizzle {
  background-image: $cloudy-bg-color;
}

.snow {
  background-image: $snowy-bg-color;
}

.thunderstorm {
  background-image: $thunder-bg-color;
}
</style>
