<template>
  <div class="frame" :class="{ 'frame--disabled': disabled }">
    <h2 v-if="!editMode" class="frame__title">
      {{ frame.title }}
    </h2>
    <input
      v-else
      ref="frame_edit"
      class="frame__title frame__title--edit subtitle"
      type="text"
      :value="frame.title || ''"
      @blur="!disabled && $emit('done', false)"
      @keydown.esc="$emit('done', false)"
      @keydown.enter="$emit('done', $refs.frame_edit.value)"
    >

    <div v-if="!editMode" class="frame__actions">
      <trash-icon size="16" class="frame__actions__close" @click="$emit('remove')" />
      <edit-icon size="16" class="frame__actions__edit" @click="$emit('edit')" />
    </div>

    <div class="frame__body">
      <t-todo v-for="todo in frame.todos" :key="todo.id" :todo="todo" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { TrashIcon, EditIcon } from 'vue-feather-icons'
import { FullFrame } from '../../store'

export default Vue.extend({
  components: {
    TrashIcon,
    EditIcon
  },

  props: {
    frame: {
      type: Object,
      required: true
    } as PropOptions<FullFrame>,
    editMode: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    editMode () {
      this.$nextTick().then(() =>
        (this.$refs.frame_edit as HTMLInputElement).focus()
      )
    }
  },

  mounted () {
    if (this.editMode) {
      (this.$refs.frame_edit as HTMLInputElement).focus()
    }
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
  position: relative;

  margin: 0px 12px;
  &:first-child {
    margin-left: 0px;
  }
  &:last-child {
    margin-right: 0px;
  }

  &__title {
    margin: 10px 0px 20px 0px;
    &--edit {
      font-weight: bold;
      font-size: 1.5em;
      border: none;
      outline: none;
      width: 100%;
      background: none;
    }
  }

  &__actions {
    --color: #{$color-blue};
    position: absolute;
    top: 8px;
    right: 10px;
    color: var(--color);

    svg {
      cursor: pointer;
      transition: filter .15s ease-in-out;
      &:hover {
        filter: brightness(1.5);
      }
    }

    .dark & {
      --color: #{$color-dark-blue};
    }
  }

  &--disabled {
    filter: grayscale(1) opacity(0.5);
    cursor: wait;
  }

  .dark & {
    --background-color: #{$color-blue};
  }
}
</style>
