<template>
  <div class="container">
    <t-frame-container :frames="frames" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    frames () {
      return this.$store.getters.fullFrames
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
