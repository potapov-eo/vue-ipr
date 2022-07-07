<template>

  <h3 class="week-day">{{  moment(weatherDataInDay[0].dt_txt).locale('ru').format('dddd') }}</h3>

  <div class="weather-card">

  <weather-card-item
    v-for="item in weatherDataInDay"
    :weather="item"  />

  </div>
</template>


<script >
import weatherCardItem from './weather-card-item'
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
