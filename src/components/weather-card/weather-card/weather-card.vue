<template>
<div class="weather_card-wraps">
  <h2 class="week-day">{{  moment(weatherDataInDay[0].dt_txt).locale('ru').format('dddd') }}</h2>

  <div class="weather-card">

  <weather-card-item
    v-for="(item, i) in weatherDataInDay"
    :weather="item"
    :index="i"
  />
  </div>
  </div>
</template>


<script >
import weatherCardItem from '../weather-card-item'
import './weather-card.scss'
import moment from "moment";
export default {

  props: ['weatherDataInDay'],

  setup(props) {
    return {
      moment
    }
  },
  components: {
    weatherCardItem
  }
}
</script>

<style scoped lang="scss">
.df{
  margin: 30px 0;
}

</style>
