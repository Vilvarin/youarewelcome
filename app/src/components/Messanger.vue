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
               :content="message.content"
               :creationTime="message.creationTime">
      </message>
    </div>

    <send-form @submitMessage="addMessage"></send-form>
  </div>
</template>

<script>
import Message from './Message'
import SendForm from './Send-form'

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
    addMessage (message) {
      this.messages.push(message)
    }
  },

  components: {
    Message,
    SendForm
  }
}
</script>

<style scoped lang="scss">
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
  background-color: #ccc;
  padding: 10px;
}
</style>
