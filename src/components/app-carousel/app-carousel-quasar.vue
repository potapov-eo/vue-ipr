<template>
  <div class="q-pa-md">
    <div class="q-gutter-md">
      <q-carousel
        v-model="carouselSlide"
        transition-prev="jump-right"
        transition-next="jump-left"
        swipeable
        animated
        control-color="white"
        navigation
        padding
        arrows
        height="500px"
        class="carousel"
      >
        <q-carousel-slide v-for="(item, i) in weatherDataInDays" key="i" :name="moment(item[0].dt_txt).format('L')" class="column no-wrap flex-center">
         <WeatherCard
            :weatherDataInDay="item">
          </WeatherCard>
        </q-carousel-slide>

      </q-carousel>

    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import moment from 'moment'
import WeatherCard from '../weather-card/weather-card'
import { useRoute } from 'vue-router'
const props = defineProps({
  weatherDataInDays: Array
})

const route = useRoute()
const { slide } = route.query
const isData = props.weatherDataInDays.some(item => moment(item[0].dt_txt).format('L') === slide)
const initSlide = isData ? slide : moment(props.weatherDataInDays[0][0]).format('L')

const carouselSlide = ref(initSlide)

watch(carouselSlide, (carouselSlide) => {
  let currentRoute = window.location.hash
  if (currentRoute.includes('&slide=')) {
    const routeArr = window.location.hash.split('&')
    const slideIndex = routeArr.findIndex(param => param.includes('slide'))
    routeArr.splice(slideIndex, 1)
    currentRoute = routeArr.join('&')
  }
  window.history.pushState('lat-lon', 'lat-lon', `${currentRoute}&slide=${carouselSlide}`)
})

</script>

<style scoped lang="scss">
.carousel{
  background: var(--primaryBlack);
  height: 500px;
}
</style>
