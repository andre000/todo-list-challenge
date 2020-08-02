<template>
  <div class="container">
    <t-frame-container :frames="frames" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async fetch () {
    try {
      await this.$store.dispatch('listFrame')
    } catch (err) {
      this.$toast.error('Sorry! We couldn\'t reach the server. Try again later')
    }
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
