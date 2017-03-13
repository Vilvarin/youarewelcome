<template>
  <div id="app">
    <messanger></messanger>

    <div class="info">
      <p>
        В приложении реализованы следующие фичи:
        <ul>
          <li>Поиск в тексте сообщений</li>
          <li>Возможность скрыть\показать историю сообщений</li>
          <li>Вывод даты сообщения</li>
          <li>Возможность удалить сообщение из истории</li>
          <li>Сообщение можно отправить при нажатии ctrl+enter. Закрыть панель с формой поиска можно через esc.</li>
          <li>Эмуляция задержки сервера в 1.5 секунды.</li>
          <li>Обработка ошибок в случае проблем с сервером или его отсутствия</li>
          <li>История сохраняется в localStorage</li>
        </ul>
        ...остальное не реализовано.<br />
        Для примера добавлено несколько тестовых сообщений.
      </p>

      <p>
        Приложение должно работать во всех современных браузерах.
        Лучше всего открывать в Хроме, конечно. При вёрстке использовались flexbox,
        для запросов с сервера использовался Fetch API, так что приложение точно не будет
        работать в браузерах, которые не поддерживают эти стандарты.
        В остальном ничего экзотического нет. 
      </p>

      <p>
        При реализации использовались следующие сторонние библиотеки и ресурсы:
        <ul>
          <li>стандартный сборщик на webpack из vuejs-templates репозитория</li>
          <li><strong>lodash.debounce</strong> - для устранения проблем при вводе в поля формы</li>
          <li><strong>moment.js</strong> - для простого вывода и обработки дат</li>
          <li><strong>reset.css</strong> - сброс css стилей</li>
          <li><strong>Material icons</strong> - иконки</li>
          <li><strong>Lora</strong> - шрифт с google fonts</li>
        </ul>
      </p>

      <p>
        <strong>Спасибо за внимание!</strong>
      </p>
    </div>
  </div>
</template>

<script>
import Messanger from './components/Messanger'

export default {
  name: 'app',
  components: {
    Messanger
  }
}
</script>

<style lang="scss">
// Fonts
@import url('https://fonts.googleapis.com/css?family=Lora:400,400i,700,700i');

@font-face {
  font-family: 'icomoon';
  src:
    url('./assets/fonts/icomoon.ttf?xko5sp') format('truetype'),
    url('./assets/fonts/icomoon.woff?xko5sp') format('woff'),
    url('./assets/fonts/icomoon.svg?xko5sp#icomoon') format('svg');
  font-weight: normal;
  font-style: normal;
}

// Includes
@import '../node_modules/reset.css/reset.css';
@import './assets/styles/icons.scss';
</style>

<style lang="scss">
@import './assets/styles/global.scss';
</style>

<style scoped lang="scss">
@import './assets/styles/variables.scss';
@import './assets/styles/mixins.scss';

#app {
  margin: 20px;
}

.info {
  float: left;
  padding-left: 100px;
  width: 700px;
  text-align: left;
}
</style>
