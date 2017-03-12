<template>
  <div class="top-panel">
    <div class="user-info">
      <div class="avatar"><img :src="companion.avatar" alt="аватарка"></div>
      <div class="name">{{ companion.name }}</div>
    </div>

    <div class="search-form" :class="{'open': searchFormIsOpen}">
      <input type="text" name="search"
             @input="updateSearchForm"
             v-model="searchInput">

      <button type="button" class="reset-button" @click="resetSearchForm">
        <i class="reset-icon"></i>Очистить
      </button>
    </div>

    <div class="buttons">
      <!-- <button type="button"
              class="history-button"
              @click="openTimeButton">
        <i class="history-icon"></i>История
      </button> -->

      <button type="button"
              class="search-button"
              @click="toggleSearchForm">
        <i class="search-icon"></i>Поиск
      </button>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'

export default {
  name: 'top-panel',

  props: {
    companion: Object
  },

  data () {
    return {
      searchFormIsOpen: false,
      searchInput: ''
    }
  },

  methods: {
    toggleSearchForm () {
      this.searchFormIsOpen = !this.searchFormIsOpen
    },

    updateSearchForm: debounce(function (e) {
      this.forceUpdateSearchForm()
    }, 300),

    forceUpdateSearchForm () {
      this.$emit('search', this.searchInput)
    },

    resetSearchForm () {
      this.searchInput = ''
      this.forceUpdateSearchForm()
      this.toggleSearchForm()
    }
  }
}
</script>

<style lang="scss">
.top-panel {
  height: 60px;
  background-color: var(--background-color);

  &:after {
    content: '';
    clear: both;
    display: table;
  }
}

.user-info {
  float: left;
}

.buttons {
  float: right;
}

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
