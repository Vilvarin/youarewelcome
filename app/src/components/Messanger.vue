<template>
  <div class="messanger">
    <top-panel :companion="companion"
               @search="findMessages"
               @toggleHistory="toggleHistoryHandler">
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
import moment from 'moment'

import Message from './Message'
import SendForm from './Send-form'
import TopPanel from './Top-panel'

import api from '../api'
import avatar from '../assets/img/favicon.png'

export default {
  name: 'messanger',

  data () {
    return {
      messages: [
        {authorID: 0, content: 'Старое сообщение', creationTime: new Date(2010)},
        {authorID: 0, content: 'Ещё одно старое сообщение', creationTime: new Date(2010)}
      ],
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

           let lastMessage = this.messages.pop()
           lastMessage.error = true
           this.addMessage(lastMessage)
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
    },

    toggleHistoryHandler () {
      this.messages = this.messages.map(message => {
        let today = moment().format('YYYY.MM.DD')
        let messageDay = moment(message.creationTime).format('YYYY.MM.DD')

        if (messageDay !== today) {
          message.hidden = !message.hidden
        }

        return message
      })
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
@import '../assets/styles/variables.scss';
@import '../assets/styles/mixins.scss';

.messanger {
  margin: 0 auto;
  width: 320px;
  background-color: #fff;
  float: left;
  overflow: hidden;

  box-shadow: 0 0 25px -4px;
}

.messages {
  @include scrollbar();

  height: 400px;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: $pale-gray-color;
  padding: 10px;
}
</style>
