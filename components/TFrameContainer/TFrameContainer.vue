<template>
  <div class="frame__container">
    <t-frame v-for="frame in frames" :key="frame.id" :frame="frame" />
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { Frame } from '@/services/ootz'

export default Vue.extend({
  props: {
    frames: {
      type: Array,
      default: () => []
    } as PropOptions<Array<Frame>>
  }
})
</script>

<style lang="scss" scoped>
.frame__container {
  display: flex;
}
</style>
