/* eslint-disable */
<template>

  <VueMultiselect
    ref="Multiselect"
    v-model="selectValue"
    :options="options"
    @keyup="getOptions"
    label="label"
  >
    <template v-slot:noResult>
      <span>
    ВВедите минимум три символа, либо попробуйте изменить запрос
  </span>
    </template>
    <template v-slot:noOptions>
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
import WeatherCard from '../WeatherCard'
import { getCityList } from '@/components/SelectComponent/utils'

export default {
  props: { selectValue: {} },
  setup (props) {
    const Multiselect = ref(null)
    const isLoading = ref(false)
    const options = ref([])
    const getOptions = async () => {
      try {
        const optionsList = await getCityList(Multiselect)
       if(optionsList) {
         options.value = optionsList.response.GeoObjectCollection.featureMember.map(item => ({
           ...item,
           label: `${item.GeoObject.name}, ${item.GeoObject.description}`
         }))
       }
      } catch (e) {
        alert('Ошибка получения опций(гео)')
      }
    }

    return {
      options,
      getOptions,
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

<style src="../../../node_modules/vue-multiselect/dist/vue-multiselect.css"></style>
