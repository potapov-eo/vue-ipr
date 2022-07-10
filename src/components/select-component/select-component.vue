/* eslint-disable */
<template>
  <VueMultiselect
    :loading="isLoading"
    style="width: 1300px"
    ref="Multiselect"
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

<script setup>
import VueMultiselect from 'vue-multiselect'
import { ref, watch } from 'vue'
import WeatherCard from '@/components/weather-card/weather-card'
import { getCityList } from '@/api/getGeo'

const Multiselect = ref(null)

const isLoading = ref(false)
const options = ref([])
const getOptions = async () => {
  try {
    isLoading.value = true
    options.value = await getCityList(Multiselect)
  } catch (e) {
    alert('Ошибка получения опций(гео)')
  } finally {
    isLoading.value = false
  }
}
const clearOptions = () => {
  options.value = []
}

</script>
<style src="../../../node_modules/vue-multiselect/dist/vue-multiselect.css">
</style>
