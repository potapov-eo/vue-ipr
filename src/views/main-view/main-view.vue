/* eslint-disable */
<template>
  <div class="about">
    <h1 class="title">Погода</h1>
    <h4 class="time"> местное время: {{ time }} </h4>
    <SelectComponent v-model="selectValue"></SelectComponent>
    <app-carousel-composition :weatherDataInDays="weatherDataInDays"></app-carousel-composition>
  </div>
  <!--  <app-carousel></app-carousel>-->

</template>

<script>
import { toRefs, ref, watch, computed, reactive } from 'vue'
import SelectComponent from '/src/components/select-component/select-component'
import AppCarousel from '/src/components/app-carousel/app-carousel'
import AppCarouselComposition from '/src/components/app-carousel/app-carousel-compositon'
import { useStore } from 'vuex'
import WeatherCard from '../../components/weather-card/weather-card/weather-card'
import { useRoute, useRouter } from 'vue-router'
import { BCarousel, BCarouselSlide } from 'bootstrap-vue-3'
import './main-view.scss'
import '../../assets/layouts/colors.scss'
import { useTime } from '@/views/main-view/use'

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
    const router = useRouter()
    const route = useRoute()
    const { city } = route.query
    const initVal = city ? {
      label: city,
      GeoObject: {}
    } : null
    const selectValue = ref(initVal)
    const isLoading = ref(false)
    const options = ref([])

    const weatherValue = computed(() => store.getters['weather/weather'])
    const weatherDataInDays = computed(() => store.getters['weather/weatherDataInDays'])
    //получение погоды
    watch(selectValue, async (selectValue) => {
      if ( selectValue ) {
        const [lon, lat] = selectValue.GeoObject.Point.pos.split(' ')
       // await router.replace(`#/weather?lat=${lat}&lon=${lon}&city=${selectValue.label}`)
        const ssws= route
        window.history.pushState('lat-lon', 'lat-lon', `#/weather?lat=${lat}&lon=${lon}&city=${selectValue.label}`)
       // debugger
        await store.dispatch('weather/getWeather', {
          lon,
          lat
        })
      }
    })

    // кастомные часы
    // Todo очистка интервала
    const time = useTime(weatherValue)

    return {
      selectValue,
      options,
      isLoading,
      weatherValue,
      weatherDataInDays,
      time
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


</style>
