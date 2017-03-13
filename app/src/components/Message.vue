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
  margin: 20px 60px 20px 10px;
  padding: 10px;

  &:after {
    content: '';
    position: absolute;
    background-color: transparent;

    border: 10px solid transparent;
    border-right: 10px solid $bg-color;

    width: 0;
    height: 0;
    left: -20px;
    right: auto;
    bottom: 12px;
  }

  &:first-child {
    margin-top: 0;
  }

  &.from-me {
    margin-right: 10px;
    margin-left: 50px;

    &:after {
      border: 10px solid transparent;
      border-left: 10px solid $bg-color;
      right: -20px;
      left: auto;
    }
  }

  &.error {
    background-color: $primary-dark-color;
  }

  &error:after {
    border-right-color: $primary-dark-color;
  }

  &.error.from-me:after {
    border-left-color: $primary-dark-color;
  }
}

.info {
  text-align: right;
}

.error-icon {
  color: #fff;
  vertical-align: middle;
}
</style>
