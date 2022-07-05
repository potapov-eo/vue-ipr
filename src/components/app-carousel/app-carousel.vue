/* eslint-disable */
<template>

  <div>
    <b-carousel

      id="carousel-1"
      v-model="slide"

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
<!--      <b-carousel-slide active img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>

      <b-carousel-slide caption="Blank Image2" img-blank img-alt="Blank image">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
          a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
        </p>
      </b-carousel-slide>-->
      <b-carousel-slide v-for="(slides, i) in slides" :key="i" active img-blank> {{slides.text}}</b-carousel-slide>
<!--      <b-carousel-slide v-for="slide in slides" caption="Blank Image3" img-blank img-alt="Blank image">
        <p>
          {{ slide.text }}
        </p>
      </b-carousel-slide>-->
    </b-carousel>

    <p class="mt-4">
      Slide #: {{ slide }}<br>
      Sliding: {{ sliding }}<br>
      Sliding: {{ slides }}<br>
    </p>
  </div>

</template>

<script>

import { BCarousel, BCarouselSlide } from 'bootstrap-vue-3'
export default {
  props: { selectValue: {} },
  data() {
    return {
      slide: 1,
      sliding: null,
      slides: [
        {text:  "https://picsum.photos/1024/480/?image=58"},
        {text:  "https://picsum.photos/1024/480/?image=54"},
        {text:  "https://picsum.photos/1024/480/?image=58"},
        {text:  "https://picsum.photos/1024/480/?image=58"},

      ]
    }
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    }
  },
  components: {
    BCarouselSlide,
    BCarousel,
  }
}
</script>

<style></style>
<!--
https://bootstrap-vue.org/docs/components/carousel

-->
