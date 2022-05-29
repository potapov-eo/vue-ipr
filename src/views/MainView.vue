/* eslint-disable */
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <SelectComponent  v-model="selectValue"></SelectComponent>
  </div>

  <div v-if="!!weatherValueList">
    <h1>weatherValue</h1>
    <WeatherCard
      v-for="item in weatherValueList"
      :weather="item">
    </WeatherCard>
  </div>
  <div v-else> weatherValue = 0</div>
</template>

<script>
import VueMultiselect from 'vue-multiselect'
import { ref, watch, computed } from 'vue'
import axios from 'axios'
import config from '/config'
import SelectComponent from '/src/components/SelectComponent/SelectComponent'
import { useStore } from 'vuex'
import WeatherCard from '../components/WeatherCard'

export default {
  setup () {
    const store = useStore()
    const selectValue = ref(null)
    const Multiselect = ref(null)
    const isLoading = ref(false)
    const options = ref([])

    // ToDo почему не перерисовывается weatherValue
    const weatherValueList = ref(null)
    const weatherValue = computed(() => store.getters['weather/weather'])
    watch(weatherValue, (weatherValue) => {
      weatherValueList.value = weatherValue.list
    })

    //получение погоды
    watch(selectValue, async (selectValue) => {
      await store.dispatch('weather/getWeather', { value:selectValue })
    })

    const asyncFind = async () => {
      const searchValue = Multiselect.value.search

      if ( searchValue.length > 2 ) {
        try {
          const { data } = await axios.get(config.geoApi, {
            params: {
              apikey: config.apiKeyGeo,
              format: 'json',
              geocode: searchValue
            }
          })
          options.value = data.response.GeoObjectCollection.featureMember.map(item => ({
            ...item,
            label: `${item.GeoObject.name}, ${item.GeoObject.description}`
          }))
        } catch (e) {
          alert('ошибка получения геокодинга')
        }
      }
    }

    return {
      selectValue,
      options,
      asyncFind,
      Multiselect,
      isLoading,
      weatherValue,
      weatherValueList
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
