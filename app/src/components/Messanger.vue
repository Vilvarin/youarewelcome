<template>
  <div class="messanger">
    <div class="top-panel">
      <button class="settings-button">
        <i class="settings-icon"></i>
      </button>
    </div>

    <div class="messages">
      <message v-for="message in messages"
               :message="message">
      </message>
    </div>

    <send-form @submitMessage="submitMessageHandler"></send-form>
  </div>
</template>

<script>
import Message from './Message'
import SendForm from './Send-form'
import api from '../api'

export default {
  name: 'messanger',

  data () {
    return {
      messages: []
    }
  },

  methods: {
    submitMessageHandler (message) {
      this.addMessage(message)
      this.getAnswer(message)
    },

    addMessage (message) {
      this.messages.push(message)
    },

    getAnswer (message) {
      api.getAnswer(message.content)
         .then(answer => {
           if (answer.ok) {
             this.addMessage({
               authorID: 1,
               content: answer.a
             })
           } else {
             throw new Error(answer.error)
           }
         })
         .catch(() => {
           this.addMessage({
             authorID: 0,
             content: 'Ошибка сервера, сообщение не доставлено',
             error: true
           })
         })
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
