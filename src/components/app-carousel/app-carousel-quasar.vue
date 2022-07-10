/* eslint-disable */
<template>
  <div class="q-pa-md">
    <div class="q-gutter-md">
      <q-carousel
        v-model="slide"
        transition-prev="scale"
        transition-next="scale"
        swipeable
        animated
        control-color="white"
        navigation
        padding
        arrows
        height="500px"
        class="carousel"
      >
        <q-carousel-slide v-for="(item, i) in weatherDataInDays" key="i" :name="i.toString()" class="column no-wrap flex-center">
         <WeatherCard
            :weatherDataInDay="item">
          </WeatherCard>
        </q-carousel-slide>

      </q-carousel>

    </div>
    <WeatherCard
      v-for="item in weatherDataInDays"
      :weatherDataInDay="item">
    </WeatherCard>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import WeatherCard from '../weather-card/weather-card'
const props = defineProps({
  weatherDataInDays: Array
})
const slide= ref('0')
const lorem= 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.'

/* import { ref } from 'vue'

export default {
  setup () {
    return {
      slide: ref('style'),
      lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.'
    }
  }
} */
</script>

<style scoped lang="scss">
.carousel{
  background: var(--primaryBlack);
  height: 500px;
}
</style>
