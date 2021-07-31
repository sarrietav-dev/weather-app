<template>
  <div :class="getBgColor" id="background">
    <header>
      <p class="date">{{ getDate }}</p>
      <p class="time">{{ getHour }}</p>
      <p class="location">{{ location }}</p>
    </header>
    <img :src="getSVGsrc" class="weather-icon" />
    <p class="temperature">
      {{ getTemperatureValue }}
      <span :class="temperature.metric" @click="changeMetric"></span>
    </p>
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
    main: WeatherCondition | '';
    description: string;
  };
  temperature: {
    value: number;
    metric: 'celsius' | 'fahrenheit';
  };
}

export default defineComponent({
  name: 'App',
  data(): AppState {
    return {
      location: '',
      weather: {
        main: '',
        description: '',
      },
      temperature: {
        value: 0,
        metric: 'celsius',
      },
    };
  },
  methods: {
    changeMetric() {
      if (this.temperature.metric === 'celsius')
        this.temperature.metric = 'fahrenheit';
      else this.temperature.metric = 'celsius';
    },
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
      const hour = new Date().getMonth();
      const dayPeriod = hour > 6 && hour < 18 ? 'day' : 'night';

      if (this.weather.main === 'Rain')
        return require(`@/assets/${dayPeriod}/rain.svg`);
      if (this.weather.main === `Thunderstorm`)
        return require(`@/assets/${dayPeriod}/thunderstorm.svg`);
      if (this.weather.main === 'Snow')
        return require(`@/assets/${dayPeriod}/snow.svg`);
      if (this.weather.main === 'Clear')
        return require(`@/assets/${dayPeriod}/clear.svg`);
      return require(`@/assets/${dayPeriod}/cloudy.svg`);
    },
    getTemperatureValue(): number {
      if (this.temperature.metric === 'fahrenheit')
        return (this.temperature.value * 9) / 5 + 32;
      return this.temperature.value;
    },
  },
  created() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      axios
        .get<CurrentWeatherDataResponse>('api/fetch-weather', {
          params: {
            lat: latitude,
            lon: longitude,
          },
        })
        .then((response) => {
          this.temperature.value = response.data.main.temp;
          this.location = response.data.name;
          const { main, description } = response.data.weather[0];
          this.weather = { main, description };
        })
        .catch((err) => console.error(err));
    });
  },
});
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
  background-color: #181a1b;
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

    span {
      display: inline-block;
      transition: all 0.25s;

      &:hover {
        transform: rotate(360deg) translateY(-0.75rem);
      }

      &:active {
        transform: rotate(360deg) translateY(-0.25rem);
      }
    }

    .celsius {
      &::after {
        content: '°C';
      }

      &:hover::after {
        content: '°F';
      }
    }

    .fahrenheit {
      &::after {
        content: '°F';
      }

      &:hover::after {
        content: '°C';
      }
    }
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
