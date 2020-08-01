<template>
  <div class="frame">
    <h2 class="frame__title">
      {{ frame.title }}
    </h2>
    <div class="frame__body">
      <t-todo v-for="todo in frame.todos" :key="todo.id" :todo="todo" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { FullFrame } from '../../store'

export default Vue.extend({
  props: {
    frame: {
      type: Object,
      required: true
    } as PropOptions<FullFrame>
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.frame {
  --background-color: #fff;
  background: var(--background-color);
  border-radius: $border-radius;
  padding: $padding;
  width: 15vw;

  margin: 0px 12px;
  &:first-child {
    margin-left: 0px;
  }
  &:last-child {
    margin-right: 0px;
  }

  &__title {
    margin: 10px 0px 20px 0px;
  }

  .dark & {
    --background-color: #{$color-blue};
  }
}
</style>
