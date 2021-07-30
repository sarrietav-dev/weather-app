<template>
  <div :class="getBgColor" id="background">
    {{ location }} {{ getDate }} {{ getHour }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'App',
  data() {
    return {
      location: 'Cartagena',
      weather: {
        main: 'Thunderstorm',
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
  },
});

// eslint-disable-next-line no-unused-vars
function getApiPromise() {
  Date.prototype.toLocaleString('default', { weekday: 'long' });

  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    axios
      .get(
        `api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=8e71173fd511d2582e29c50306f73b14`,
      )
      .then((response) => {
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
  color: hsl(0, 0%, 80%);
}

#app,
#background {
  height: 100%;
}

.clear {
  background-image: $sunny-bg-color;
}

.clouds {
  background-image: $cloudy-bg-color;
}

.snow {
  background-image: $snowy-bg-color;
}

.thunderstorm {
  background-image: $thunder-bg-color;
}
</style>
