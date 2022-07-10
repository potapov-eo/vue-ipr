<template>
  <div class="weather-card-item">
    <h5 v-if="!weather?.isEmpty">{{ moment(weather.dt_txt).format(' HH:mm ') }}</h5>
    <h5 v-else>{{ getTime(index) }}</h5>
    <Icon :iconType="weather.weather? weather.weather[0].main : 'no'"/>
    <h2 v-if="weather?.main?.temp">{{ Math.round(weather.main.temp) }} °C</h2>
  </div>
</template>

<script>
import Icon from './icon'
import { getTime } from './utils'
import moment from 'moment'

export default {

  props: ['weather', 'index'],

  setup (props) {
    return {
      moment,
      getTime
    }
  },
  components: {
    Icon
  }
}
</script>

<style scoped lang="scss">

</style>
