<template>
  <div class="send-form" @keyup.ctrl.enter="submitMessage">
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
      <i class="massive submit-icon"></i>
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

<style scoped lang="scss">
@import '../assets/styles/mixins.scss';

.send-form {
  position: relative;
  z-index: 5;
  display: flex;
  align-items: stretch;
  overflow: hidden;

  height: 78px;
  background-color: #fff;

  box-shadow: 0 0 10px 0;
}

.chat-input {
  @include scrollbar();

  flex: 1;
  padding: 10px;
  resize: none;
}

.send-button {
  flex: 0;
  height: 100%;
  padding: 0;
}
</style>
