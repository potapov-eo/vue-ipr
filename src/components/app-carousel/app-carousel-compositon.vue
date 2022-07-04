/* eslint-disable */
<template>
      <b-carousel
        ref="myCarousel"
        id="carousel-1"
        v-model="slide"
        @change="value =>{debugger}"
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
<!--
        <b-carousel-slide v-for="(slides, i) in slides" :key="i" active :img-src="slides.text"></b-carousel-slide>
-->
        <b-carousel-slide caption="11" id="1" active img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>
        <b-carousel-slide caption="22" id="2" active img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>

        <b-carousel-slide   id="3" caption="Blank Image2" img-blank img-alt="Blank image">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
            a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
          </p>
        </b-carousel-slide>

        <b-carousel-slide id="4"  caption="Blank Image3" img-blank img-alt="Blank image">
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
</template>

<script>
import { ref } from 'vue'
import { BCarousel, BCarouselSlide } from 'bootstrap-vue-3'

export default {

  setup (props) {

    const slide = ref(0)
    const sliding = ref(null)
    const myCarousel = ref(null)
    const  slides = ref([
      {text:  "https://picsum.photos/1024/480/?image=58"},
      {text:  "https://picsum.photos/1024/480/?image=54"},
      {text:  "https://picsum.photos/1024/480/?image=52"},
      {text:  "https://picsum.photos/1024/480/?image=58"},

    ])
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
      slide,
      myCarousel,
      next,
      onSlideStart,
      onSlideEnd, sliding, slides
    }
  },
  components: {
    BCarouselSlide,
    BCarousel,
  }
}
</script>

<style></style>
