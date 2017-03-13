<template>
  <div :class="{ 'from-me': fromMe, 'error': error }"
       class="message"
       v-show="!hidden">
    <div class="content">{{ content }}</div>

    <div class="info">
      <i class="error-icon" v-show="error"></i>
      <span class="date" v-show="!error">{{ time }}</span>
    </div>
  </div>
</template>

<script>
import * as moment from 'moment'
import 'moment/locale/ru'

export default {
  name: 'message',

  props: {
    authorID: {
      type: Number,
      default () { return 0 }
    },

    content: {
      type: String,
      default () { return '' }
    },

    creationTime: {
      type: Date,
      default () { return new Date() }
    },

    error: {
      type: Boolean,
      default () { return false }
    },

    hidden: {
      type: Boolean,
      default () { return false }
    }
  },

  computed: {
    time () {
      return moment(this.creationTime).calendar(null, {
        sameDay: 'H:mm',
        lastDay: '[Вчера] H:mm',
        lastWeek: 'dddd, H:mm',
        sameElse: 'MMMM'
      })
    },

    fromMe () {
      return !this.authorID
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/variables.scss';

$bg-color: #fff;

.message {
  position: relative;

  background-color: $bg-color;
  margin: 20px 30px 20px 5px;
  padding: 10px;

  border-radius: -5px 5px 0 5px;
  box-shadow: -5px 0 16px 0 rgba(0, 0, 0, .5);

  &:after {
    content: '';
    position: absolute;
    background-color: transparent;

    border: 10px solid transparent;
    border-bottom: 6px solid $bg-color;

    width: 0;
    height: 0;
    left: -10px;
    right: auto;
    bottom: 0;
  }

  &:first-child {
    margin-top: 0;
  }

  &.from-me {
    margin-right: 5px;
    margin-left: 30px;
    border-radius: 5px 5px 0 5px;

    &:after {
      border: 10px solid transparent;
      border-bottom: 6px solid $bg-color;
      right: -10px;
      left: auto;
    }
  }

  &.error {
    background-color: $primary-dark-color;
    color: $inverted-font-color;
    padding: 8px;
  }

  &.error:after {
    border-bottom-color: $primary-dark-color;
  }
}

.info {
  text-align: right;
}

.error-icon {
  color: $inverted-font-color;
  vertical-align: middle;
}
</style>
