<template>
  <div :class="{ 'from-me': fromMe, 'error': error }"
       class="message"
       v-show="!hidden">
    <div class="delete" @click="onDelete"><i class="tiny close-icon"></i></div>

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
    id: {
      type: Number,
      required: true
    },

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
        lastDay: '[Вчера,] H:mm',
        lastWeek: 'dddd, H:mm',
        sameElse: 'DD/MM/YYYY'
      })
    },

    fromMe () {
      return !this.authorID
    }
  },

  methods: {
    onDelete () {
      this.$emit('delete', this.id)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/styles/variables.scss';

$bg-color: #fff;

.message {
  position: relative;

  background-color: $bg-color;
  margin: 20px 30px 20px 5px;
  padding: 10px;

  border-radius: 5px 5px 5px 0;
  box-shadow: 5px 0 16px 0 rgba(0, 0, 0, .5);

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
    box-shadow: -5px 0 16px 0 rgba(0, 0, 0, .5);

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

.message:hover {
  .delete { opacity: 1; }
}

.delete {
  position: absolute;
  right: 0; top: 0;
  margin: 0 2px;

  opacity: 0;
  color: $primary-sat-color;

  transition: all .2s;
  cursor: pointer;

  &:hover {
    color: $primary-dark-color;
  }
}

.message.error .delete {
  color: $inverted-font-color;
  &:hover { color: black; }
}

.info {
  text-align: right;
  color: $gray-color;
  font-size: $small-font-size;
}

.error-icon {
  color: $inverted-font-color;
  vertical-align: middle;
}
</style>
