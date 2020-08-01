<template>
  <div class="card">
    <div class="card__status" :class="{ 'card__status--checked': !todo.open }">
      <div class="card__status__checkbox" />
    </div>

    <h4 class="card__title">
      {{ todo.title }}
    </h4>
    <div class="card__body">
      {{ todo.description }}
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

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.card {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;

  &__status {
    flex-basis: 15%;
    &__checkbox {
      height: 20px;
      width: 20px;
      border-radius: 100%;
      display: inline-block;
      border: 1px #ddd solid;

      .dark & {
        border: 1px $color-dark-blue solid;
      }

      &::before {
        margin: 3px;
        content: '';
        display: block;
        background: #eee;
        height: 14px;
        width: 14px;
        border-radius: 100%;
        opacity: 0.7;

        .dark & {
          background: $color-dark-blue;
        }
      }
    }

    &--checked {
      .card__status {
        &__checkbox {
          border: 1px solid $color-dark-blue;
          .dark & {
            border: 1px solid #fff;
          }

          &::before {
            background: $color-dark-blue;
            .dark & {
              background: #fff;
            }
          }
        }
      }
    }
  }

  &__title {
    margin: 0px;
  }

  &__body {
    flex-basis: 100%;
    margin-left: 15%;
    color: #aaa;
    .dark & {
      color: #fffa;
    }
  }
}
</style>
