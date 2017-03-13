<template>
  <div class="messanger">
    <top-panel :companion="companion"
               @search="findMessages"
               @toggleHistory="toggleHistoryHandler">
    </top-panel>

    <div class="messages">
      <message v-for="message in messages" :key="message.id"
               :id="message.id"
               :authorID="message.authorID"
               :content="message.content"
               :creation-time="message.creationTime"
               :error="message.error"
               :hidden="message.hidden"
               @delete="deleteMessage">
      </message>

      <transition name="fade">
        <div class="writes" v-show="writes">Вам пишут...<i class="tiny pen-icon"></i></div>
      </transition>
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
    let storeData = localStorage.getItem('messangerData')

    if (storeData) {
      storeData = JSON.parse(storeData)
      storeData.writes = false

      return storeData
    } else {
      return {
        messageID: 1,

        messages: [
          {
            id: 0,
            authorID: 0,
            content: 'Старое сообщение',
            creationTime: new Date(2017, 1, 12),
            hidden: true
          },
          {
            id: 1,
            authorID: 0,
            content: 'Ещё одно старое сообщение',
            creationTime: new Date(2017, 1, 13),
            hidden: true
          },
          {
            id: 2,
            authorID: 1,
            content: 'Шушпанчик что-то ответил',
            creationTime: new Date(2017, 2, 18),
            hidden: true
          },
          {
            id: 3,
            authorID: 1,
            content: 'Новое сообщение от шушпанчика'
          }
        ],

        companion: { avatar, name: 'Огненный шушпанчик' },
        writes: false
      }
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
      this.messageID++
      message.id = this.messageID

      this.messages.push(message)
    },

    deleteMessage (id) {
      for (let i = 0; i < this.messages.length; i++) {
        if (this.messages[i]['id'] === id) {
          this.messages.splice(i, 1)

          break
        }
      }
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

        this.toggleHistoryHandler(false)
      }
    },

    toggleHistoryHandler (state) {
      this.messages = this.messages.map(message => {
        let today = moment().format('YYYY.MM.DD')
        let messageDay = moment(message.creationTime).format('YYYY.MM.DD')

        if (messageDay !== today) {
          message.hidden = !state
        }

        return message
      })
    }
  },

  watch: {
    messages (newMessages) {
      localStorage.setItem('messangerData', JSON.stringify({
        messageID: this.messageID,
        messages: newMessages,
        companion: this.companion
      }))
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

  position: relative;
  height: 400px;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: $pale-gray-color;
  padding: 10px;
}

.writes {
  position: absolute;
  left: 0; bottom: 0;
  color: $dark-gray-color;
  padding-left: 10px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s
}
.fade-enter, .fade-leave-to /* .fade-leave-active для <2.1.8 */ {
  opacity: 0
}
</style>
