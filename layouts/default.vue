<template>
  <div class="page">
    <header class="page__header">
      <h1>
        Todo App
      </h1>
      <t-theme-switch v-model="theme" class="page__header__theme" />
    </header>
    <main class="page__main">
      <Nuxt />
    </main>
    <footer class="page__footer">
      <a href="http://github.com/andre000">@andre000</a>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { TodoState } from '../store'

export default Vue.extend({
  computed: {
    theme: {
      get () {
        return this.$store.state.theme
      },
      set (theme: TodoState) {
        this.$store.commit('CHANGE_THEME', theme)
        this.setTheme()
      }
    }
  },

  methods: {
    setTheme () {
      this.theme === 'dark'
        ? document.body.classList.add('dark')
        : document.body.classList.remove('dark')
    }
  }
})
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
@import '@/assets/scss/variables.scss';

.page {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: calc(100vh - 1px - 10vh);
  padding: 5vh 15vw;

  @media #{$screen-md-below} {
    padding: 5vh 15vw;
  }

  &__header {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  &__main {
    overflow-x: auto;
  }

  &__footer {
    text-align: center;
    a {
      --color: #888a;
      text-decoration: none;
      font-size: 11px;
      color: var(--color);
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
