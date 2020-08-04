<template>
  <div class="theme-switch title">
    <sun-icon v-if="value === 'light'" @click="$emit('input', 'dark')" />
    <moon-icon v-if="value === 'dark'" @click="$emit('input', 'light')" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { SunIcon, MoonIcon } from 'vue-feather-icons'

export default Vue.extend({
  components: {
    SunIcon,
    MoonIcon
  },

  props: {
    value: {
      type: String,
      default: ''
    }
  }
})
</script>

<style lang="scss" scoped>
.theme-switch {
  display: inline;
  font-size: 2em;
  margin: 0.67em 0;
  cursor: pointer;
}
</style>
