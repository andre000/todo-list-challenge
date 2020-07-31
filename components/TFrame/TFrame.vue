<template>
  <div class="frame">
    <div class="frame__title">
      {{ props.title }}
    </div>
    <div class="frame__body">
      // TODO
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { Frame } from '@/services/ootz'

export default Vue.extend({
  props: {
    frame: {
      type: Object,
      required: true
    } as PropOptions<Frame>
  }
})
</script>
