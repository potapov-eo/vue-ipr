/* eslint-disable */
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <SelectComponent v-model="selectValue"></SelectComponent>

    <div v-if="!!weatherValue?.list">
      <h1>weatherValue</h1>
      <WeatherCard
        v-for="item in weatherValue?.list"
        :weather="item">
      </WeatherCard>
    </div>
    <div v-else> weatherValue = 0</div>

    <b-carousel
      ref="myCarousel"
      id="carousel-1"
      :v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Slides with image only -->
      <b-carousel-slide active img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>

      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
      <b-carousel-slide caption="Blank Image1" img-blank img-alt="Blank image">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
          a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
        </p>
      </b-carousel-slide>
      <b-carousel-slide caption="Blank Image2" img-blank img-alt="Blank image">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
          a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
        </p>
      </b-carousel-slide>
      <b-carousel-slide caption="Blank Image3" img-blank img-alt="Blank image">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
          a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
        </p>
      </b-carousel-slide>
    </b-carousel>
    <button v-on:click="next">next</button>
    <p class="mt-4">
      Slide #: {{ slide }}<br>
      Sliding: {{ sliding }}
    </p>
  </div>

</template>

<script>
import { toRefs, ref, watch, computed, reactive } from 'vue'
import SelectComponent from '/src/components/SelectComponent/SelectComponent'
import { useStore } from 'vuex'
import WeatherCard from '../components/WeatherCard'
import { useRoute } from 'vue-router'
import { BCarousel, BCarouselSlide } from 'bootstrap-vue-3'

export default {
  //props: ['lat', 'lon'],
  beforeMount () {
    const route = useRoute()
    const store = useStore()
    const {
      lon,
      lat
    } = route.query
    console.log(route.query.lat)
    console.log(route.query.lon)
    if ( lon && lat ) {
      store.dispatch('weather/getWeather', {
        lon,
        lat
      })
    }
  },
  setup (props) {
    const {} = toRefs(props)
    const store = useStore()
    const selectValue = ref(null)
    const isLoading = ref(false)
    const options = ref([])

    const weatherValue = computed(() => store.getters['weather/weather'])

    //получение погоды
    watch(selectValue, async (selectValue) => {
      const [lon, lat] = selectValue.GeoObject.Point.pos.split(' ')
      window.history.pushState('lat-lon', 'lat-lon', `home?lat=${lat}&lon=${lon}`)
      await store.dispatch('weather/getWeather', {
        lon,
        lat
      })
    })
    const slide = ref(0)
    const sliding = ref(null)
    const myCarousel = ref(null)
    const next = () => {
      console.log('myCarousel',myCarousel)
      debugger
      slide.value = 3
     // myCarousel.value.modelValue = 1

    }
    const onSlideStart = () => {
      sliding.value = true
    }
    const onSlideEnd = () => {
      sliding.value = false
    }


    return {
      selectValue,
      options,
      isLoading,
      weatherValue,
      slide,
      myCarousel,
      next,
      onSlideStart,
      onSlideEnd,sliding
    }
  },
  components: {
    BCarouselSlide,
    BCarousel,
    WeatherCard,
    SelectComponent,
  }
}
</script>

<style>
.about {
  background: #e9ecef;
}

</style>
