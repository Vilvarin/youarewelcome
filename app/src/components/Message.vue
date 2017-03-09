<template>
  <div :class="{ 'from-me': fromMe }"
       class="message">
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
    authorID: Number,
    content: String,
    creationTime: {
      type: Function,
      default () { return new Date() }
    }
  },

  computed: {
    time () {
      const now = moment()
      const time = moment(this.creationTime)

      if (now.isBefore(time, 'day')) {
        return time.fromNow()
      } else {
        return time.format('H:mm')
      }
    },

    fromMe () {
      return !!this.authorID
    }
  }
}
</script>

<style lang="scss">
.message {
  background-color: #fff;
  margin: 20px 0;
  padding: 10px;

  &:first-child {
    margin: 0;
  }
}
</style>
