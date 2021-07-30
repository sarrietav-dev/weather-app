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
      const [weekday, day, month] = [
        date.getDay(),
        date.getDate(),
        date.getMonth(),
      ];
      return `${getWeekDayString(weekday)}, ${day} ${getMonth(month)}`;
    },
    getHour() {
      const date = new Date();
      return `${date.getHours()}:${date.getMinutes()}`;
    },
  },
});
// eslint-disable-next-line no-unused-vars
function getApiPromise() {
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

function getWeekDayString(date: number) {
  switch (date) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Thursday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Tuesday';
    case 5:
      return 'Friday';
    case 6:
      return 'Sunday';
  }
}
</script>

<style lang="scss">
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

  --snowy-bg-color: linear-gradient(
    to bottom right,
    hsl(0, 0%, 75%),
    hsl(0, 0%, 100%)
  );
  --cloudy-bg-color: linear-gradient(
    to bottom right,
    hsl(194, 60%, 53%),
    hsl(194, 60%, 63%)
  );
  --sunny-bg-color: linear-gradient(
    to bottom right,
    hsl(15, 100%, 70%),
    hsl(15, 100%, 75%)
  );
  --thunder-bg-color: linear-gradient(
    to bottom right,
    hsl(249, 30%, 15%),
    hsl(249, 30%, 25%)
  );
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
  background-image: var(--sunny-bg-color);
}

.clouds {
  background-image: var(--cloudy-bg-color);
}

.snow {
  background-image: var(--snowy-bg-color);
}

.thunderstorm {
  background-image: var(--thunder-bg-color);
}
</style>
