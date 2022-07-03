/* eslint-disable */
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <SelectComponent  v-model="selectValue"></SelectComponent>
  </div>

  <div v-if="!!weatherValue?.list">
    <h1>weatherValue</h1>
    <WeatherCard
      v-for="item in weatherValue?.list"
      :weather="item">
    </WeatherCard>
  </div>
  <div v-else> weatherValue = 0</div>
</template>

<script>
import VueMultiselect from 'vue-multiselect'
import { toRefs, ref, watch, computed, reactive } from 'vue'
import SelectComponent from '/src/components/SelectComponent/SelectComponent'
import { useStore } from 'vuex'
import WeatherCard from '../components/WeatherCard'
import { useRoute } from 'vue-router'

export default {
  //props: ['lat', 'lon'],
  setup (props) {
    const {  } = toRefs(props)
    const route = useRoute()
    const store = useStore()
    const selectValue = ref(null)
    const Multiselect = ref(null)
    const isLoading = ref(false)
    const options = ref([])

    const weatherValue = computed(() => store.getters['weather/weather'])


    console.log(route.params.lat)
    console.log(route.params.lon)

    //if()

    //получение погоды
    watch(selectValue, async (selectValue) => {
      await store.dispatch('weather/getWeather', { value:selectValue })
    })




    return {
      selectValue,
      options,
      Multiselect,
      isLoading,
      weatherValue,
    }
  },
  components: {
    VueMultiselect,
    WeatherCard,
    SelectComponent
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
