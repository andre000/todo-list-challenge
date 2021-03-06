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

    <draggable
      draggable=".drag"
      class="frame__body"
      :data-id="frame.id"
      :list="frame.todos"
      group="frames"
      @end="handleTodoDrag"
    >
      <t-todo
        v-for="todo in frame.todos"
        :key="todo.id"
        :data-id="frame.id"
        class="drag"
        :todo="todo"
        :edit-mode="todo.id === editingTodoID"
        :disabled="todo.id === disabledTodoID"
        @edit="editingTodoID = $event.id"
        @remove="removeTodo"
        @done="changeTodo"
        @checked="checkTodo"
      />
    </draggable>
    <span
      v-if="!newTodo && !editMode"
      class="link frame__body__new"
      @click="newTodo = {}"
    >
      + add new task
    </span>
    <t-todo
      v-else-if="!editMode"
      :todo="newTodo"
      :edit-mode="true"
      :disabled="isLoadingNewTodo"
      @done="createNewTodo"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { TrashIcon, EditIcon } from 'vue-feather-icons'
import { FullFrame } from '../../store'
import { TodoInput, Todo } from '../../services/ootz'

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

  data: () => ({
    newTodo: null as any,
    isLoadingNewTodo: false,
    editingTodoID: '',
    disabledTodoID: ''
  }),

  computed: {
    ...mapGetters(['fullFrames'])
  },

  watch: {
    editMode () {
      this.$nextTick().then(() =>
        this.$refs.frame_edit && (this.$refs.frame_edit as HTMLInputElement).focus()
      )
    }
  },

  mounted () {
    if (this.editMode) {
      (this.$refs.frame_edit as HTMLInputElement).focus()
    }
  },

  methods: {
    async createNewTodo (todo: Todo) {
      if (!todo) {
        this.newTodo = null
        return false
      }

      this.isLoadingNewTodo = true
      const todos = [...this.frame.todos] as Array<Todo>
      const getOrder = todos.length
        ? (todos.sort((a, b) => a.order > b.order ? 1 : -1).pop() as Todo).order
        : 0

      const newTodo: TodoInput = {
        title: todo.title,
        order: (getOrder + 1),
        frame_id: this.frame.id,
        description: todo.description,
        open: true
      }

      this.newTodo = newTodo

      try {
        await this.addTodo(newTodo)
      } catch (error) {
        this.$toast.error('Sorry. Server is currently unavaiable')
      } finally {
        this.isLoadingNewTodo = false
        this.newTodo = null
      }
    },

    async changeTodo (todo: Todo) {
      this.editingTodoID = ''
      if (!todo) { return false }

      this.disabledTodoID = todo.id

      try {
        await this.editTodo(todo)
      } catch (error) {
        this.$toast.error('Sorry. Server is currently unavaiable')
      } finally {
        this.disabledTodoID = ''
      }
    },

    async removeTodo (todo: Todo) {
      try {
        await this.deleteTodo(todo)
      } catch (err) {
        this.$toast.error('Sorry. Server is currently unavaiable')
      }
    },

    async checkTodo (todo: Todo) {
      this.disabledTodoID = todo.id

      try {
        await this.editTodo({ ...todo, open: !todo.open })
      } catch (error) {
        this.$toast.error('Sorry. Server is currently unavaiable')
      } finally {
        this.disabledTodoID = ''
      }
    },

    async handleTodoDrag (event: any) {
      const oldFrameID = event.from.attributes.getNamedItem('data-id').value
      const newFrameID = event.to.attributes.getNamedItem('data-id').value

      const isChangingFrames = oldFrameID !== newFrameID

      if (isChangingFrames) {
        const oldFrame = (this.fullFrames as Array<FullFrame>).find(f => f.id === oldFrameID)
        const newFrame = (this.fullFrames as Array<FullFrame>).find(f => f.id === newFrameID)
        const transferedTodo = newFrame?.todos.find(t => t.frame_id !== newFrame.id)

        await Promise.all([
          this.editFrame(oldFrame),
          this.editFrame(newFrame)
        ])

        await this.editTodo({
          ...transferedTodo,
          frame_id: newFrame?.id
        })

        await Promise.all([
          this.updateTodoOrder(oldFrame),
          this.updateTodoOrder(newFrame)
        ])

        return false
      }

      try {
        await this.updateTodoOrder(this.frame)
      } catch (error) {
        this.$toast.error('Sorry. Server is currently unavaiable')
        await this.listFrame()
      }
    },

    ...mapActions(['addTodo', 'editTodo', 'deleteTodo', 'updateTodoOrder', 'listFrame', 'editFrame'])
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
  width: 20vw;
  flex-shrink: 0;
  position: relative;
  box-sizing: border-box;

  margin: 0px 12px;
  &:first-child {
    margin-left: 0px;
  }
  &:last-child {
    margin-right: 0px;
  }

  @media #{$screen-md} {
    width: 25vw;
  }

  @media #{$screen-sm-below} {
    margin: 10px 0px;
    width: 100%;
  }

  &__title {
    margin: 10px 0px 20px 0px;
    cursor: move;

    &--edit {
      cursor: auto;
      font-weight: bold;
      font-size: 1.5em;
      border: none;
      outline: none;
      width: 100%;
      background: none;
    }
  }

  &__body {
    &__new {
      color: $color-blue;
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
  }

  &--disabled {
    filter: grayscale(1) opacity(0.5);
    cursor: wait;
  }
}
</style>
