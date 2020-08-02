<template>
  <div class="container">
    <t-frame-container :frames="frames" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async fetch () {
    await this.$store.dispatch('listFrame')
  },

  computed: {
    frames () {
      return this.$store.getters.fullFrames
    }
  },

  methods: {
    refresh () {
      this.$fetch()
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
