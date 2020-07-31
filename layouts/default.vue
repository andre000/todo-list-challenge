<template>
  <div class="page">
    <header class="page__header">
      Header
    </header>
    <main class="page__main">
      <Nuxt />
    </main>
    <footer class="page__footer">
      Footer
    </footer>
  </div>
</template>

<style lang="scss">
@import url('@/assets/scss/main.scss');

.page {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}
</style>
