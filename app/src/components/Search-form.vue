<template>
  <div class="search-form" :class="{'open': isOpen}">
    <input type="text" name="search" @input="update" v-model="input">
    <button type="button" class="reset-button" @click="reset">
      <i class="reset-icon"></i>Очистить
    </button>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'

export default {
  name: 'search-form',

  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      input: ''
    }
  },

  methods: {
    update: debounce(function (e) {
      this.$emit('input', this.input)
    }, 300),

    forceUpdate () {
      this.$emit('input', this.input)
    },

    reset () {
      this.input = ''
      this.forceUpdate()
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
.search-form {
  position: absolute;
  overflow: hidden;
  height: 0;
  transition: height .3s;

  &.open {
    height: 30px;
  }
}
</style>
