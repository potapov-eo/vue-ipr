/* eslint-disable */
<template>
  <div class="about">
    <SelectComponent v-model="selectValue"></SelectComponent>

    <div v-if="!!weatherValue?.list">
      <h1>weatherValue</h1>
      <WeatherCard
        v-for="item in weatherValue?.list"
        :weather="item">
      </WeatherCard>
    </div>
    <div v-else> weatherValue = 0</div>

  </div>
<!--  <app-carousel></app-carousel>-->
  <app-carousel-composition></app-carousel-composition>
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
.about {
  background: #e9ecef;
}
.color {
  color: red;
}

</style>
