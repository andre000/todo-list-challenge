<template>
  <div class="card" :class="{'card--disabled': disabled, 'card--checked': !todo.open && !editMode}">
    <div v-if="!editMode" class="card__status" :class="{ 'card__status--checked': !todo.open }">
      <div class="card__status__checkbox" @click="$emit('checked', todo)" />
    </div>

    <div v-if="!editMode" class="card__actions">
      <trash-icon size="12" @click="$emit('remove', todo)" />
      <edit-icon size="12" @click="$emit('edit', todo)" />
    </div>

    <h4 v-if="!editMode" class="card__title">
      {{ todo.title }}
    </h4>
    <input
      v-else
      ref="todo_edit"
      v-model="newTodo.title"
      placeholder="Task title"
      class="card__title card__title--edit subtitle"
    >

    <div class="card__body">
      <template v-if="!editMode">
        {{ todo.description }}
      </template>
      <textarea
        v-else
        v-model="newTodo.description"
        placeholder="Task description"
        class="card__body--edit"
        rows="5"
      />
    </div>
    <div v-if="editMode" class="card__edit__actions">
      <span class="link" @click="saveTodo">save</span>
      <span class="link" @click="$emit('done', false)">cancel</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { TrashIcon, EditIcon } from 'vue-feather-icons'
import { Todo } from '@/services/ootz'

export default Vue.extend({
  components: {
    TrashIcon,
    EditIcon
  },
  props: {
    todo: {
      type: Object,
      required: true
    } as PropOptions<Todo>,
    editMode: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    newTodo: {
      title: '',
      description: ''
    }
  }),

  watch: {
    editMode () {
      if (this.todo.title) {
        this.newTodo.title = this.todo.title
        this.newTodo.description = this.todo.description
      }
    }
  },

  methods: {
    saveTodo () {
      if (this.newTodo.title.trim() === '') {
        this.$toast.error('Title can\'t be empty')
        return false
      }
      if (this.newTodo.description.trim() === '') {
        this.$toast.error('Description can\'t be empty')
        return false
      }

      const todo = this.todo ? { ...this.todo, ...this.newTodo } : this.newTodo

      this.$emit('done', todo)
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.card {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  position: relative;

  &__status {
    flex-basis: 15%;
    &__checkbox {
      --border: 1px #ddd solid;
      cursor: pointer;
      height: 20px;
      width: 20px;
      border-radius: 100%;
      display: inline-block;
      border: var(--border);

      &::before {
        --background-color: #eee;
        margin: 3px;
        content: '';
        display: block;
        background: var(--background-color);
        height: 14px;
        width: 14px;
        border-radius: 100%;
        opacity: 0.7;
      }
    }

    &--checked {
      .card__status {
        &__checkbox {
          --border: 1px solid #{$color-dark-blue};
          border: var(--border);

          &::before {
            --background-color: #{$color-dark-blue};
          }
        }
      }
    }
  }

  &__title {
    margin: 0px;
    &--edit {
      font-size: 16px;
      border: none;
      background: none;
      width: 100%;
      font-weight: bold;
      outline: none;
      margin-left: 15%;
    }
  }

  &__body {
    --color: #aaa;
    flex-basis: 100%;
    margin-left: 15%;
    color: var(--color);

    &--edit {
      color: var(--color);
      width: 100%;
      outline: none;
      background: none;
      border: none;
      resize: none;
    }
  }

  &__edit__actions {
    text-align: right;
    width: 100%;
  }

  &__actions {
    display: none;
    position: absolute;
    right: 0px;

    svg {
      cursor: pointer;
      &:hover {
        filter: opacity(0.7);
      }
    }
  }

  &--disabled {
    opacity: 0.5;
    cursor: wait;
  }

  &--checked {
    text-decoration: line-through;
    opacity: 0.5;
  }

  &:hover {
    .card__actions {
      display: block;
    }
  }

}
</style>
