<template>
  <div class="messanger">
    <top-panel :companion="companion"
               @search="findMessages">
    </top-panel>

    <div class="messages">
      <message v-for="message in messages"
               :authorID="message.authorID"
               :content="message.content"
               :creation-time="message.creationTime"
               :error="message.error"
               :hidden="message.hidden">
      </message>

      <div class="writes" v-show="writes">Вам пишут</div>
    </div>

    <send-form @submitMessage="submitMessageHandler"></send-form>
  </div>
</template>

<script>
import Message from './Message'
import SendForm from './Send-form'
import TopPanel from './Top-panel'

import api from '../api'
import avatar from '../assets/img/favicon.png'

export default {
  name: 'messanger',

  data () {
    return {
      messages: [],
      companion: { avatar, name: 'Огненный шушпанчик' },
      writes: false
    }
  },

  methods: {
    submitMessageHandler (message) {
      this.addMessage(message)

      if (!this.writes) {
        this.getAnswer(message)
      }
    },

    addMessage (message) {
      this.messages.push(message)
    },

    getAnswer (message) {
      this.writes = true

      api.getAnswer(message.content)
         .then(answer => {
           this.writes = false

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
           this.writes = false

           this.addMessage({
             authorID: 0,
             content: 'Ошибка сервера, сообщение не доставлено',
             error: 'Ошибка сервера, сообщение не доставлено'
           })
         })
    },

    findMessages (text) {
      if (text) {
        this.messages = this.messages.map(message => {
          let position = message.content.indexOf(text)

          if (position === -1) {
            message.hidden = true
          } else {
            message.hidden = false
          }

          return message
        })
      } else {
        this.messages = this.messages.map(message => {
          message.hidden = false

          return message
        })
      }
    }
  },

  components: {
    Message,
    SendForm,
    TopPanel
  }
}
</script>

<style scoped lang="scss">
.messanger {
  margin: 0 auto;
  width: 320px;
  background-color: #fff;
  float: left;
}

.messages {
  height: 400px;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: var(--background-color);
  padding: 10px;
}
</style>
