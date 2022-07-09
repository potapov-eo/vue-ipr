<template>
<div class="wrap">
  <div v-if="iconType==='no'" class="icon sun-shower no">
    <div class="cloud"></div>
    <div class="sun">
      <div class="rays"></div>
    </div>
  </div>

  <div v-if="iconType==='Extreme'" class="icon thunder-storm">
    <div class="cloud"></div>
    <div class="lightning">
      <div class="bolt"></div>
      <div class="bolt"></div>
    </div>
  </div>

  <div v-if="iconType==='Clouds'" class="icon cloudy">
    <div class="cloud"></div>
    <div class="cloud"></div>
  </div>

  <div v-if="iconType==='Snow'" class="icon flurries">
    <div class="cloud"></div>
    <div class="snow">
      <div class="flake"></div>
      <div class="flake"></div>
    </div>
  </div>

  <div v-if="iconType==='Clear'" class="icon sunny">
    <div class="sun">
      <div class="rays"></div>
    </div>
  </div>

  <div v-if="iconType==='Rain'" class="icon rainy">
    <div class="cloud"></div>
    <div class="rain"></div>
  </div>
</div>
</template>


<script >
import './icon.scss'


export default {
  props: ['iconType'],

  setup(props) {

    return {

    }
  },
  components:{

  }
}
</script>

<style  lang="scss">

</style>
