import { Store } from 'vuex'
import api, { Frame, Todo, FrameInput, TodoInput } from '@/services/ootz'

const mockFrame: Array<Frame> = [
  {
    id: 'abc1',
    title: 'Frame 1',
    created_at: '2020-01-01 12:50:01',
    order: 1,
    todos: [
      {
        id: 'cdb1',
        frame_id: 'abc1',
        title: 'TODO',
        description: 'Todo 1',
        open: true,
        order: 1,
        created_at: '2020-01-01 12:50:01'
      },
      {
        id: 'cdb2',
        frame_id: 'abc1',
        title: 'TODO',
        description: 'Todo 2',
        open: true,
        order: 2,
        created_at: '2020-01-01 12:50:01'
      }
    ]
  },
  {
    id: 'abc2',
    title: 'Frame 2',
    created_at: '2020-01-01 12:50:01',
    order: 2,
    todos: [
      {
        id: 'cdb3',
        frame_id: 'abc2',
        title: 'TODO',
        description: 'Todo 3',
        open: true,
        order: 2,
        created_at: '2020-01-01 12:50:01'
      }
    ]
  }
]

export interface FullFrame extends Frame {
  todos: Array<Todo>
}

export interface TodoState {
  frames: Array<Frame|never>;
  todos: Array<Todo|never>;
}

export const state = () => ({
  frames: [...mockFrame]
} as TodoState)

export const mutations = {
  UPDATE_FRAME_LIST (state: TodoState, frames: Array<Frame>) {
    state.frames = frames
  },
  ADD_FRAME (state: TodoState, frame: Frame) {
    state.frames.push(frame)
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
      todos: f.todos ? f.todos
        .filter(t => t.frame_id === f.id)
        .sort(sortByOrder) : []
    })).sort(sortByOrder)
  }
}

export const actions = {
  async getFrame () {},
  async listFrame (store: Store<TodoState>) {
    const { data: frames } = await api.frame.list()
    store.commit('UPDATE_FRAME_LIST', frames)
  },
  async addFrame (store: Store<TodoState>, frame: FrameInput) {
    const { data: frames } = await api.frame.create(frame)
    store.commit('ADD_FRAME', frames)
  },
  async editFrame (store: Store<TodoState>, frame: Frame) {
    const { data: frames } = await api.frame.update(frame)
    store.commit('EDIT_FRAME', frames)
  },
  async deleteFrame (store: Store<TodoState>, frame: Frame) {
    await api.frame.delete(frame.id)
    store.commit('DELETE_FRAME', frame.id)
  },

  async getTodo () {},
  async addTodo (store: Store<TodoState>, todo: TodoInput) {
    const { data: savedTodo } = await api.todo.create(todo)
    store.commit('ADD_TODO', savedTodo)
  },
  async editTodo (store: Store<TodoState>, todo: Todo) {
    const { data: todos } = await api.todo.update(todo)
    store.commit('EDIT_TODO', todos)
  },
  async deleteTodo (store: Store<TodoState>, todo: Todo) {
    await api.todo.delete(todo.id)
    store.commit('DELETE_TODO', todo)
  }
}
