<template>
  <div class="weather-card-item">
  <div>{{ moment(weather.dt_txt).format(' HH:mm ') }}</div>
  <div v-if="weather?.main?.temp" >{{ weather.main.temp }}</div>
  <div v-else="weather?.main?.temp" >000000</div>
    </div>
</template>


<script >
import './weather-card-item.scss'
import moment from "moment";

export default {

  props: ['weather'],

  setup(props) {
    return {
      moment
    }
  }
}
</script>

<style scoped lang="scss">

</style>
