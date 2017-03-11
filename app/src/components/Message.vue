<template>
  <div :class="{ 'from-me': fromMe, 'error': error }"
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
    message: Object
  },

  data () {
    return {
      authorID: this.message.authorID || 0,
      content: this.message.content || '',
      creationTime: this.message.creationTime || new Date(),
      error: this.message.error || false
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
