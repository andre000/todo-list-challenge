/* eslint-disable camelcase */
import { FrameInput, OotzResponse, Frame, Todo, TodoInput } from '../ootz'

export default {
  frame: {
    create (frame: FrameInput): Promise<OotzResponse<Frame>> {
      return jest.fn().mockResolvedValue({
        return_code: 1,
        data: {
          id: `${Math.random() * 1000}`,
          created_at: `${new Date()}`,
          ...frame
        }
      } as OotzResponse<Frame>)(frame)
    },
    update (frame: Frame): Promise<OotzResponse<Frame>> {
      return jest.fn().mockResolvedValue({
        return_code: 1,
        data: {
          ...frame
        }
      } as OotzResponse<Frame>)(frame)
    },
    delete (id: string) {
      return jest.fn().mockResolvedValue({
        return_code: 1,
        data: {}
      } as OotzResponse<Frame>)(id)
    },
    list (): Promise<OotzResponse<Frame>> {
      return jest.fn().mockResolvedValue({
        return_code: 1,
        data: [],
        messageopcional: ''
      } as OotzResponse<Frame>)()
    },
    get (id: string): Promise<OotzResponse<Frame>> {
      return jest.fn().mockResolvedValue({
        return_code: 1,
        data: { id }
      } as OotzResponse<Frame>)(id)
    }
  },

  todo: {
    create (todo: TodoInput): Promise<OotzResponse<Todo>> {
      return jest.fn().mockResolvedValue({
        return_code: 1,
        data: {
          id: `${Math.random() * 1000}`,
          created_at: `${new Date()}`,
          ...todo
        },
        messageopcional: ''
      } as OotzResponse<Todo>)(todo)
    },
    update (todo: Todo): Promise<OotzResponse<Todo>> {
      return jest.fn().mockResolvedValue({
        return_code: 1,
        data: {
          ...todo
        }
      } as OotzResponse<Todo>)(todo)
    },
    delete (id: string) {
      return jest.fn().mockResolvedValue({
        return_code: 1,
        data: {}
      } as OotzResponse<Todo>)(id)
    },
    get (id: string): Promise<OotzResponse<Todo>> {
      return jest.fn().mockResolvedValue({
        return_code: 1,
        data: { id }
      } as OotzResponse<Todo>)(id)
    }
  }
}
