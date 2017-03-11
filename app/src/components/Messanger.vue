<template>
  <div class="messanger">
    <div class="top-panel">
      <div class="user-info">
        <div class="avatar"><img src="../assets/img/favicon.png" alt="аватарка"></div>
        <div class="name">Огненный Шушпанчик</div>
      </div>

      <div class="buttons">
        <!-- <button type="button"
                class="history-button"
                @click="openTimeButton">
          <i class="history-icon"></i>История
        </button> -->

        <button type="button"
                class="search-button"
                @click="searchPanelIsOpen = !searchPanelIsOpen">
          <i class="search-icon"></i>Поиск
        </button>

        <!-- <button type="button" class="settings-button">
          <i class="settings-icon"></i>Настройки
        </button> -->

        <!-- markdown -->
        <!-- localeStorage -->
        <!-- редактирование -->
        <!-- удаление -->
      </div>
    </div>

    <search-form :isOpen="searchPanelIsOpen"
                 @input="findMessages"
                 @close="searchPanelIsOpen = !searchPanelIsOpen">
    </search-form>

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
import SearchForm from './Search-form'
import api from '../api'

export default {
  name: 'messanger',

  data () {
    return {
      messages: [],
      writes: false,
      searchPanelIsOpen: false
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
    SearchForm
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

  &:after {
    content: '';
    clear: both;
    display: table;
  }
}

.user-info {
  float: left;
}

.buttons {
  float: right;
}

.messages {
  min-height: 600px;
  background-color: #ccc;
  padding: 10px;
}
</style>
