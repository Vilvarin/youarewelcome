<template>
  <div class="send-form">
    <textarea name="chat-input"
              id="chat-input"
              class="chat-input"
              autofocus
              placeholder="Напишите сообщение..."
              v-model="tempContent">
    </textarea>

    <button type="button"
            class="send-button"
            @click="submitMessage">
      <i class="send-icon"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'send-form',

  data () {
    return {
      tempContent: ''
    }
  },

  methods: {
    submitMessage () {
      this.$emit('submitMessage', {
        authorID: 0,
        content: this.tempContent,
        date: new Date()
      })

      this.tempContent = ''
    }
  }
}
</script>

<style lang="scss">
$send-button-size: 20px;

.send-form {
  display: flex;
  align-items: center;

  height: 60px;
  background-color: #fff;
}

.chat-input {
  height: 100%;
  padding: 10px;
  resize: none;
  width: calc(100% - #{$send-button-size});
}

.send-button {
  width: $send-button-size;
  height: 100%;
}
</style>
