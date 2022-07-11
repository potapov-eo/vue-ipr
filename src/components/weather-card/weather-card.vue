<template>
<div class="weather_card-wraps">
  <h2 class="week-day">{{  moment(props.weatherDataInDay[0].dt_txt).locale('ru').format('dddd') }}</h2>

  <div class="weather-card">

  <weather-card-item
    v-for="(item, i) in props.weatherDataInDay"
    :weather="item"
    :index="i"
  />
  </div>
  </div>
</template>

<script setup lang="ts">
import weatherCardItem from './weather-card-item'
import moment from 'moment'
import { weatherDataInDay } from '@/store/modules/utils'


type propsType = {
  weatherDataInDay: weatherDataInDay [] ;
}
const props = defineProps<propsType>()

</script>

<style scoped lang="scss">
.weather_card-wraps{
  display: block !important;
}

.weather-card{
  display: flex;
  gap: 16px;
  justify-content: space-between
}
.week-day{
  margin: 50px 0;
}

.no{
  color: black;
  opacity: 0.1;
}

</style>
