<template>
  <div class="weather-card-item">
    <h5 v-if="!weather?.isEmpty">{{ moment(weather.dt_txt).format(' HH:mm ') }}</h5>
    <h5 v-else>{{ getTime(index) }}</h5>
    <Icon :iconType="weather.weather? weather.weather[0].main : 'no'"/>
    <h4 v-if="weather?.main?.temp">{{ Math.round(weather.main.temp) }} °C</h4>
  </div>
</template>

<script setup>
import Icon from './icon'
import { getTime } from './utils'
import moment from 'moment'

const props = defineProps({
  weather: Object,
  index: Number
})

</script>

<style scoped lang="scss">

</style>
