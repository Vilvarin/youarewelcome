<template>
  <div class="messanger">
    <div class="top-panel">
      <button class="settings-button">
        <i class="settings-icon"></i>
      </button>
    </div>

    <div class="messages">
      <message v-for="message in messages"
               :authorID="message.authorID"
               :content="message.content">
      </message>
    </div>

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
  </div>
</template>

<script>
import Message from './Message'

export default {
  name: 'messanger',

  data () {
    return {
      messages: [
        { authorID: 1, content: 'Сообщение 1' },
        { authorID: 0, content: 'Сообщение 2' },
        { authorID: 1, content: 'Сообщение 3' }
      ],

      tempContent: ''
    }
  },

  methods: {
    submitMessage (e) {
      this.addMessage({
        authorID: 0,
        content: this.tempContent
      })

      this.tempContent = ''
    },

    addMessage (message) {
      this.messages.push(message)
    }
  },

  components: {
    Message
  }
}
</script>

<style scoped lang="scss">
$send-button-size: 20px;

.messanger {
  margin: 0 auto;
  max-width: 600px;
}

.top-panel {
  height: 60px;
  background-color: #fff;
}

.messages {
  min-height: 600px;
  background-color: #333;
  padding: 10px;
}

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
