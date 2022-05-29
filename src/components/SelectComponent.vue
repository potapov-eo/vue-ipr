/* eslint-disable */
<template>

  <VueMultiselect
    ref="Multiselect"
    v-model="selectValue"
    :options="options"
    @keyup="asyncFind"
    label="label"
  >
    <template v-slot:noResult>
      <span>
    ВВедите минимум три символа, либо попробуйте изменить запрос
  </span>
    </template>
    <template v-slot:selection="{ values, isOpen }">
        <span class="multiselect__single"
              v-if="values.length &amp;&amp; !isOpen">
          {{ values.length }} options selected
        </span>
    </template>
  </VueMultiselect>


</template>

<script>
import VueMultiselect from 'vue-multiselect'
import { ref } from 'vue'
import axios from 'axios'
import config from '/config'
import WeatherCard from '../components/WeatherCard'

export default {
  props: {selectValue:{}} ,
  setup (props) {
    const Multiselect = ref(null)
    const isLoading = ref(false)
    const options = ref([])

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
      options,
      asyncFind,
      Multiselect,
      isLoading,
    }
  },
  components: {
    VueMultiselect,
    WeatherCard
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
