/* eslint-disable */
<template>
      <b-carousel v-if="weatherDataInDays"
        ref="myCarousel"
        id="carousel-1"
        v-model="slide"
        :interval="4000"
        controls
        indicators
        background="var(--primaryBlack)"
        img-width="1500"
        img-height="480"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
        <b-carousel-slide v-for="(item, i) in weatherDataInDays" :id="i.toString()"  active img-blank  img-alt="Blank image" >
          <WeatherCard
            :weatherDataInDay="item">
          </WeatherCard>
        </b-carousel-slide>

      </b-carousel>
<!--  <button v-on:click="next">next</button>-->
<!--  <WeatherCard
    v-for="item in weatherDataInDays"
    :weatherDataInDay="item">
  </WeatherCard>-->
  <p class="mt-4">
    Slide #: {{ slide }}<br>
    Sliding: {{ sliding }}
  </p>
</template>

<script>
import { ref, reactive } from 'vue'
import { BCarousel, BCarouselSlide, BCard } from 'bootstrap-vue-3'
import WeatherCard from '../../components/weather-card/weather-card/weather-card'

export default {
  props: {
    weatherDataInDays: { required: true }
  },
  setup (props) {
    const slide = ref(0)
    const sliding = ref(null)
    const myCarousel = ref(null)

    const next = () => {
      console.log('myCarousel', myCarousel)
      slide.value = 3
      // myCarousel.value.modelValue = 1
    }
    const onSlideStart = (e) => {
      sliding.value = true
    }
    const onSlideEnd = () => {
      sliding.value = false
    }

    return {
      slide,
      myCarousel,
      next,
      onSlideStart,
      onSlideEnd,
      sliding
    }
  },
  components: {
    BCarouselSlide,
    BCarousel,
    WeatherCard
  }
}
</script>

<style>

</style>
