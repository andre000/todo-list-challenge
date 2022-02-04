import { Store } from 'vuex'
import { Frame, Todo, FrameInput, TodoInput } from '@/services/ootz'

export interface FullFrame extends Frame {
  todos: Array<Todo>
}

export interface TodoState {
  frames: Array<Frame|never>;
}

export const state = () => ({
  frames: []
} as TodoState)

export const mutations = {
  UPDATE_FRAME_LIST (state: TodoState, frames: Array<Frame>) {
    state.frames = frames
  },
  ADD_FRAME (state: TodoState, frame: Frame) {
    state.frames.push({ ...frame, todos: [] })
  },
  EDIT_FRAME (state: TodoState, frame: Frame) {
    const index = state.frames.findIndex(f => f.id === frame.id)
    state.frames.splice(index, 1, frame)
  },
  DELETE_FRAME (state: TodoState, frameId: String) {
    const index = state.frames.findIndex(f => f.id === frameId)
    state.frames.splice(index, 1)
  },

  ADD_TODO (state: TodoState, todo: Todo) {
    const index = state.frames.findIndex(f => f.id === todo.frame_id)
    const frame = state.frames[index]
    state.frames.splice(
      index,
      1,
      { ...frame, todos: [...frame.todos as any, todo] }
    )
  },
  EDIT_TODO (state: TodoState, todo: Todo) {
    const index = state.frames.findIndex(f => f.id === todo.frame_id)
    const frame = state.frames[index]

    const indexTodo = (frame.todos as Array<Todo>).findIndex(t => t.id === todo.id)
    frame.todos?.splice(indexTodo, 1, todo)

    state.frames.splice(index, 1, frame)
  },
  DELETE_TODO (state: TodoState, todo: Todo) {
    const index = state.frames.findIndex(f => f.id === todo.frame_id)
    const frame = state.frames[index]

    const indexTodo = (frame.todos as Array<Todo>).findIndex(t => t.id === todo.id)
    frame.todos?.splice(indexTodo, 1)

    state.frames.splice(index, 1, frame)
  }
}

export const getters = {
  fullFrames (state: TodoState) {
    const sortByOrder = (a: Todo|Frame, b: Todo|Frame) => (a.order > b.order) ? 1 : -1

    return state.frames.map(f => ({
      ...f,
      todos: f.todos
? f.todos
        .filter(t => t.frame_id === f.id)
        .sort(sortByOrder)
: []
    })).sort(sortByOrder)
  }
}

export const actions = {
  async getFrame () {},
  listFrame (store: Store<TodoState>) {
    store.commit('UPDATE_FRAME_LIST', store.state.frames)
  },
  addFrame (store: Store<TodoState>, frame: FrameInput) {
    store.commit('ADD_FRAME', { id: `${Number(Math.random() * 1000).toFixed(0)}`, ...frame })
  },
  editFrame (store: Store<TodoState>, frame: Frame) {
    store.commit('EDIT_FRAME', { ...frame, todos: frame.todos })
  },
  deleteFrame (store: Store<TodoState>, frame: Frame) {
    store.commit('DELETE_FRAME', frame.id)
  },
  updateFrameOrder (store: Store<TodoState>, frames: Array<Frame>) {
    const newFramesOrder = frames.map((f, i) => ({
      ...f,
      order: i
    }))

    store.commit('UPDATE_FRAME_LIST', newFramesOrder)
  },

  addTodo (store: Store<TodoState>, todo: TodoInput) {
    store.commit('ADD_TODO', { id: `${Number(Math.random() * 1000).toFixed(0)}`, ...todo })
  },
  editTodo (store: Store<TodoState>, todo: Todo) {
    store.commit('EDIT_TODO', todo)
  },
  deleteTodo (store: Store<TodoState>, todo: Todo) {
    store.commit('DELETE_TODO', todo)
  },
  updateTodoOrder (store: Store<TodoState>, frame: Frame) {
    const newTodoOrder = (frame.todos as Array<Todo>).map((t, i) => ({
      ...t,
      order: i
    }))

    store.commit('EDIT_FRAME', { ...frame, todos: newTodoOrder })
  }
}
