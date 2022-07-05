/* eslint-disable */
<template>

  <VueMultiselect
    ref="Multiselect"
    v-model="CurrentSelectValue"
    :options="options"
    @keyup="getOptions"
    label="label"
    @close="clearOptions"
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
import { ref, watch,  } from 'vue'
import WeatherCard from '../weather-card/weather-card'
import { getCityList } from '@/api/getGeo'
import { useRoute } from 'vue-router'

// todo init value CurrentSelectValue
export default {
  setup (props, context) {
    const rout = useRoute()
  /*  const initVal = rout.query?.city ? {
      label: rout.query?.city,
      value: 'initVal'
    } : null
    console.log('initVal', initVal)*/
    const Multiselect = ref(null)
    const CurrentSelectValue = ref( null)
    console.log('selectValue', CurrentSelectValue)
    const isLoading = ref(false)
    const options = ref([])
    const getOptions = async () => {
      try {
         options.value = await getCityList(Multiselect)
      } catch (e) {
        alert('Ошибка получения опций(гео)')
      }
    }
    const clearOptions = () => {
      options.value = []
    }
   /* watch(selectValue, async (selectValue) => {
      context.emits('update:modelValue', selectValue)
    })*/
    return {
      options,
      getOptions,
      Multiselect,
      isLoading,
      clearOptions,
      CurrentSelectValue
    }
  },
  components: {
    VueMultiselect,
    WeatherCard,
  }
}
</script>

<style src="../../../node_modules/vue-multiselect/dist/vue-multiselect.css"></style>
