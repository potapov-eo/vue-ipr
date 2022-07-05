<template>
  <h1 class="color" >{{ weather.main.temp }}</h1>
  <h1 class="color">ssssss</h1>
</template>


<script >
//import '../assets/layouts/index.scss'
export default {

  props: ['weather'],

  setup(props) {

    return {
    }
  }
}
</script>

<style scoped lang="scss">

/*.color2{
  color: $primaryRed ;
}*/


</style>
