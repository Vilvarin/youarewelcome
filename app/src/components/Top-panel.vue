<template>
  <div class="top-panel">
    <div class="user-info">
      <div class="avatar"><img :src="companion.avatar" alt="аватарка"></div>
      <div class="name">{{ companion.name }}</div>
    </div>

    <div class="search-form" :class="{'open': searchFormIsOpen}">
      <input type="text" name="search"
             class="search-input"
             placeholder="Искать..."
             @input="updateSearchForm"
             v-model="searchInput">

      <button type="button" class="reset-button" @click="resetSearchForm">
        <i class="close-icon"></i>
      </button>
    </div>

    <div class="buttons">
      <button type="button"
              class="history-button"
              :class="{ active: historyButtonIsActive }"
              @click="toggleHistory">
        <i class="massive history-icon"></i>
      </button>

      <button type="button"
              class="search-button"
              @click="toggleSearchForm">
        <i class="massive search-icon"></i>
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
      historyButtonIsActive: false,
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
    },

    toggleHistory () {
      this.historyButtonIsActive = !this.historyButtonIsActive
      this.$emit('toggleHistory')
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/variables.scss';

$top-panel-height: 60px;

.top-panel {
  position: relative;
  display: flex;
  justify-content: space-around;
  overflow: hidden;

  height: $top-panel-height;

  box-shadow: 0 0 10px 0;
}

.user-info {
  display: flex;
  align-items: center;
  padding: 0 10px;
}

.buttons {
  display: flex;
  align-items: stretch;
}

.avatar {
  position: relative;
  display: inline-block;
  flex: 0 0 40px;

  background-color: #fff;

  border-radius: 500px;

  padding-right: 10px;

  img {
    display: block;
    width: 40px;
    height: 40px;
    height: auto;
  }
}

.name {
  flex: 1 0 150px;
  max-height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.search-form {
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: $top-panel-height;
  transform: translateY(-#{$top-panel-height});

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: #fff;

  transition: transform .3s;

  &.open {
    transform: translateY(0);
  }
}

.search-input {
  flex: 1;
  padding: 0 5px;
  margin: 0 10px;
}

.active.history-button {
  color: $dark-gray-color;
}
</style>
