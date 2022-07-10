<template>
  <div class="about">
    <h1 class="title">Погода</h1>
    <h4 class="time"> местное время: {{ time }} </h4>
    <SelectComponent v-model="selectValue"></SelectComponent>
    <app-carousel-composition :weatherDataInDays="weatherDataInDays"></app-carousel-composition>
  </div>
  <!--  <app-carousel></app-carousel>-->

</template>

<script setup>
import { toRefs, ref, watch, computed, reactive, onBeforeMount, onUnmounted } from 'vue'
import SelectComponent from '/src/components/select-component/select-component'
import AppCarousel from '/src/components/app-carousel/app-carousel'
import AppCarouselComposition from '/src/components/app-carousel/app-carousel-quasar'
import { useStore } from 'vuex'
import WeatherCard from '../components/weather-card/weather-card'
import { useRoute, useRouter } from 'vue-router'
import { BCarousel, BCarouselSlide } from 'bootstrap-vue-3'
import '../assets/layouts/colors.scss'
import { useTime } from '@/views/use'

onBeforeMount(() => {
  const route = useRoute()
  const store = useStore()
  const {
    lon,
    lat
  } = route.query
  if (lon && lat) {
    store.dispatch('weather/getWeather', {
      lon,
      lat
    })
  }
})

const store = useStore()
const route = useRoute()
const { city } = route.query
const initVal = city
  ? {
      label: city,
      GeoObject: {}
    }
  : null
const selectValue = ref(initVal)
const weatherValue = computed(() => store.getters['weather/weather'])
const weatherDataInDays = computed(() => store.getters['weather/weatherDataInDays'])

// получение погоды
watch(selectValue, async (selectValue) => {
  if (selectValue) {
    const [lon, lat] = selectValue.GeoObject.Point.pos.split(' ')
    window.history.pushState('lat-lon', 'lat-lon', `#/weather?lat=${lat}&lon=${lon}&city=${selectValue.label}`)
    await store.dispatch('weather/getWeather', { lon, lat })
  }
})

const {
  time,
  timeInterval
} = useTime(weatherValue)
onUnmounted(() => clearInterval(timeInterval))

</script>

<style scoped lang="scss">

.about {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  min-width: 1300px;
  background: var(--primaryBlack);
  color: var(--primaryWhite);
  padding-top: 100px;
};
.title {
  margin-bottom: 50px;
}
.time{
  margin-bottom: 30px;
}

</style>
