<template>
  <div class="page">
    <header class="page__header">
      <h1>
        Todo App
      </h1>
    </header>
    <main class="page__main">
      <Nuxt />
    </main>
    <footer class="page__footer">
      <a href="http://github.com/andre000">@andre000</a>
    </footer>
  </div>
</template>

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
