<template>
  <div :class="{ 'from-me': fromMe, 'error': error }"
       class="message"
       v-show="!hidden">
    <div class="content">{{ content }}</div>

    <div class="info">
      <span class="date">{{ time }}</span>
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
      type: String,
      default () { return '' }
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
.message {
  background-color: #fff;
  margin: 20px 60px 20px 10px;
  padding: 10px;

  &:first-child {
    margin-top: 0;
  }

  &.from-me {
    margin-right: 10px;
    margin-left: 50px;
  }

  &.error {
    background-color: #a33;
  }
}

.info {
  text-align: right;
}
</style>
