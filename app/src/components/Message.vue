<template>
  <div class="message">
    <div class="avatar"></div>
    <div class="info">{{ author }}</div>
    <div class="content">{{ content }}</div>
  </div>
</template>

<script>
export default {
  name: 'message',

  props: {
    author: String,
    content: String
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
