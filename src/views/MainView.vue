/* eslint-disable */
<template>
  <div class="about">

    <h1 class="title">Погода</h1>
    <SelectComponent v-model="selectValue"></SelectComponent>
    <div v-if="!!weatherDataInDays">
      <WeatherCard
        v-for="item in weatherDataInDays"
        :weatherDataInDay="item">
      </WeatherCard>
    </div>
    <div v-else> weatherValue = 0</div>
<!--    <app-carousel-composition></app-carousel-composition>-->
  </div>
<!--  <app-carousel></app-carousel>-->

</template>

<script>
import { toRefs, ref, watch, computed, reactive } from 'vue'
import SelectComponent from '/src/components/select-component/select-component'
import AppCarousel from '/src/components/app-carousel/app-carousel'
import AppCarouselComposition from '/src/components/app-carousel/app-carousel-compositon'
import { useStore } from 'vuex'
import WeatherCard from '../components/weather-card/weather-card'
import { useRoute } from 'vue-router'
import { BCarousel, BCarouselSlide } from 'bootstrap-vue-3'
import  './main-view.scss'
import  '../assets/layouts/colors.scss'

export default {
  beforeMount () {
    const route = useRoute()
    const store = useStore()
    const {
      lon,
      lat
    } = route.query
    if ( lon && lat ) {
      store.dispatch('weather/getWeather', {
        lon,
        lat
      })
    }
  },
  setup (props) {
    const {} = toRefs(props)
    const store = useStore()
    const route = useRoute()
    const { city } = route.query
    const initVal = city ? {
      label:city,
      GeoObject: {}
    } : null
    const selectValue = ref(initVal)
    const isLoading = ref(false)
    const options = ref([])

    const weatherValue = computed(() => store.getters['weather/weather'])
    const weatherDataInDays = computed(() => store.getters['weather/weatherDataInDays'])
    //получение погоды
    watch(selectValue, async (selectValue) => {
      if(selectValue) {
        const [lon, lat] = selectValue.GeoObject.Point.pos.split(' ')
        window.history.pushState('lat-lon', 'lat-lon', `weather?lat=${lat}&lon=${lon}&city=${selectValue.label}`)
        await store.dispatch('weather/getWeather', {
          lon,
          lat
        })
      }
    })

    return {
      selectValue,
      options,
      isLoading,
      weatherValue,
      weatherDataInDays,
    }
  },
  components: {
    AppCarousel,
    BCarouselSlide,
    BCarousel,
    WeatherCard,
    SelectComponent,
    AppCarouselComposition
  }
}
</script>

<style scoped lang="scss">
.x{

}

</style>
