<template>
  <div class="card">
    <div class="card__title">
      {{ todo.title }}
    </div>
    <div class="card__body">
      {{ todo.body }}
    </div>
    <div class="card__actions">
      <i class="card__action__edit" />
      <i class="card__action__close" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { Todo } from '@/services/ootz'

export default Vue.extend({
  props: {
    todo: {
      type: Object,
      required: true
    } as PropOptions<Todo>
  }
})
</script>
