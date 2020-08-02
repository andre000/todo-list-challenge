/* eslint-disable camelcase */
import axios from 'axios'

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export interface Todo {
  id: String;
  frame_id: String;
  title: String;
  description: String;
  created_at?: String;
  open: Boolean;
  order: Number;
}

export interface TodoInput extends Omit<Todo, 'id'|'created_at'> {}

export interface Frame {
  id: String;
  title: String;
  created_at?: String;
  order: Number;
  todos: Array<Todo>;
}

export interface FrameInput extends Omit<Frame, 'id'> {}

export interface OotzResponse<T> {
  /**
   * Código de retorno da request, 1 para sucesso, 0 para erro.
   */
  return_code: Number;

  /**
   * JSON com os dados de resposta.
   */
  data: Array<T> | T;

  /**
   * Caso ocorra algum erro (return_code=0) retorna a descrição.
   */
  messageopcional: String;
}

const apikey = process.env.OOTZ_API_KEY

const api = axios.create({
  headers: {
    apikey
  },
  baseURL: process.env.OOTZ_BASE_URL
})

export default {
  frame: {
    url: 'frames',
    async create (frame: FrameInput): Promise<OotzResponse<Frame>> {
      const response = await api.post(this.url, frame)
      return response.data as OotzResponse<Frame>
    },
    async update (frame: Frame): Promise<OotzResponse<Frame>> {
      const response = await api.put(this.url, frame)
      return response.data as OotzResponse<Frame>
    },
    async delete (id: String) {
      const response = await api.delete(`${this.url}/${id}`)
      return response.data
    },
    async list (): Promise<OotzResponse<Frame>> {
      const response = await api.get(this.url)
      return response.data as OotzResponse<Frame>
    },
    async get (id: String): Promise<OotzResponse<Frame>> {
      const response = await api.get(`${this.url}/${id}`)
      return response.data as OotzResponse<Frame>
    }
  },

  todo: {
    url: 'Todo',
    async create (todo: TodoInput): Promise<OotzResponse<Todo>> {
      const response = await api.post(this.url, todo)
      return response.data as OotzResponse<Todo>
    },
    async update (todo: Todo): Promise<OotzResponse<Todo>> {
      const response = await api.put(this.url, todo)
      return response.data as OotzResponse<Todo>
    },
    async delete (id: String) {
      const response = await api.delete(`${this.url}/${id}`)
      return response.data
    },
    async get (id: String): Promise<OotzResponse<Todo>> {
      const response = await api.get(`${this.url}/${id}`)
      return response.data as OotzResponse<Todo>
    }
  }
}
