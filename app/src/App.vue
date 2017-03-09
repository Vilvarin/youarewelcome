<template>
  <div id="app">
    <messanger></messanger>
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

<style>
body {
  margin: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

#app {

}
</style>
