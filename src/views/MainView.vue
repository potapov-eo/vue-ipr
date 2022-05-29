/* eslint-disable */
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <VueMultiselect
      ref="Multiselect"
      v-model="value"
      :options="options"
      @keyup="asyncFind"
      label="label"
    >
      <span slot="noResult">
    ВВедите минимум три символа, либо попробуйте изменить запрос
  </span>
      <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template>
    </VueMultiselect>
  </div>

</template>

<script>
import VueMultiselect from 'vue-multiselect'
import { ref, watch } from 'vue'
import axios from 'axios'
import config from '/config'

export default {
  setup () {
    const value = ref(null)
    const Multiselect = ref(null)
    const isLoading = ref(false)
    const weatherValue  = ref([])

    const options = ref([])

    watch(value, async (value)=>{
      const [lon, lat] = value.GeoObject.Point.pos.split(" ")
      try {
        debugger
        const { data } = await axios.get(config.weatherApi, {
          params: {
            appid: config.apiKeyWeather,
            lat, lon
          }
        })

      } catch (e) {
        alert('ошибка получения погоды')
      }
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

          //options.value = data.response.GeoObjectCollection.featureMember.map(item => `${item.GeoObject.name}, ${item.GeoObject.description}`)
          options.value = data.response.GeoObjectCollection.featureMember.map(item => ({...item, label: `${item.GeoObject.name}, ${item.GeoObject.description}`}))
        } catch (e) {
          alert('ошибка получения геокодинга')
        }

      }
    }

    return {
      value,
      options,
      asyncFind,
      Multiselect,
      isLoading
    }
  },
  components: { VueMultiselect }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
