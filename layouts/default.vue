<template>
  <div class="page">
    <header class="page__header">
      <h1>
        Header
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

.page {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: calc(100vh - 1px - 10vh);
  padding: 5vh 15vw;

  &__footer {
    text-align: center;
    a {
      text-decoration: none;
      font-size: 11px;
      color: #888a;
      &:hover {
        text-decoration: underline;
      }
      .dark & {
        color: #fff5;
      }
    }
  }
}
</style>
