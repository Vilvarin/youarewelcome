<template>
  <div id="app">
    <messanger></messanger>

    <div class="info">
      <div class="palette">
        <div class="first block"></div>
        <div class="second block"></div>
        <div class="third block"></div>
        <!-- <div class="fourth block"></div> -->
        <div class="five block"></div>
        <div class="six block"></div>
      </div>

      <div class="pallete">
        <div class="first gray block"></div>
        <div class="second gray block"></div>
        <div class="third gray block"></div>
        <div class="fourth gray block"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Messanger from './components/Messanger'

export default {
  name: 'app',
  components: {
    Messanger
  }
}
</script>

<style lang="scss">
// Fonts
@import url('https://fonts.googleapis.com/css?family=Lora:400,400i,700,700i');

@font-face {
  font-family: 'icomoon';
  src:
    url('./assets/fonts/icomoon.ttf?xko5sp') format('truetype'),
    url('./assets/fonts/icomoon.woff?xko5sp') format('woff'),
    url('./assets/fonts/icomoon.svg?xko5sp#icomoon') format('svg');
  font-weight: normal;
  font-style: normal;
}

// Includes
@import '../node_modules/reset.css/reset.css';
@import './assets/styles/icons.scss';
</style>

<style lang="scss">
@import './assets/styles/global.scss';
</style>

<style scoped lang="scss">
@import './assets/styles/variables.scss';
@import './assets/styles/mixins.scss';

#app {
  margin: 20px;
}

.info {
  float: left;
  padding-left: 100px;
}

.palette {
  @include clearfix;
}

.block {
  color: $font-color;

  width: 50px;
  height: 50px;

  float: left;
}

.first.block {
  background-color: $primary-dark-color;
}

.second.block {
  background-color: $primary-sat-color;
}

.third.block {
  background-color: $primary-color;
}

.fourth.block {
  background-color: $secondary-color;
}

.five.block {
  background-color: $secondary-sat-color;
}

.six.block {
  background-color: $secondary-dark-color;
}

.first.gray.block {
  background-color: $pale-gray-color;
}

.second.gray.block {
  background-color: $light-gray-color;
}

.third.gray.block {
  background-color: $gray-color;
}

.fourth.gray.block {
  background-color: $dark-gray-color;
}
</style>
