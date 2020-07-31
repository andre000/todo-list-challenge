import { Frame, Todo } from '@/services/ootz'

interface TodoState {
  frames: Array<Frame|never>;
  todos: Array<Todo|never>;
}

export const state = {
  frames: [],
  todos: []
} as TodoState

export const mutations = {
  ADD_FRAME () {},
  EDIT_FRAME () {},
  DELETE_FRAME () {},

  ADD_TODO () {},
  EDIT_TODO () {},
  DELETE_TODO () {}
}

export const getters = {
  fullFrame () {}
}

export const actions = {
  async addFrame () {},
  async editFrame () {},
  async deleteFrame () {},

  async addTodo () {},
  async editTodo () {},
  async deleteTodo () {}
}
