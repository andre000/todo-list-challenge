/* eslint-disable camelcase */
import axios from 'axios'

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export interface Todo {
  id: string;
  frame_id: string;
  title: string;
  description: string;
  created_at?: string;
  open: boolean;
  order: number;
}

export interface TodoInput extends Omit<Todo, 'id'|'created_at'> {}

export interface Frame {
  id: string;
  title: string;
  created_at?: string;
  order: number;
  todos?: Array<Todo>;
}

export interface FrameInput extends Omit<Frame, 'id'> {}

export interface OotzResponse<T> {
  /**
   * Código de retorno da request, 1 para sucesso, 0 para erro.
   */
  return_code: number;

  /**
   * JSON com os dados de resposta.
   */
  data: Array<T> | T;

  /**
   * Caso ocorra algum erro (return_code=0) retorna a descrição.
   */
  messageopcional: string;
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
    url: 'frame',
    async create (frame: FrameInput): Promise<OotzResponse<Frame>> {
      const response = await api.post(this.url, frame)
      return response.data as OotzResponse<Frame>
    },
    async update (frame: Frame): Promise<OotzResponse<Frame>> {
      const response = await api.put(this.url, frame)
      return response.data as OotzResponse<Frame>
    },
    async delete (id: string) {
      const response = await api.delete(`${this.url}/${id}`)
      return response.data
    },
    async list (): Promise<OotzResponse<Frame>> {
      const response = await api.get(`${this.url}s`)
      return response.data as OotzResponse<Frame>
    },
    async get (id: string): Promise<OotzResponse<Frame>> {
      const response = await api.get(`${this.url}/${id}`)
      return response.data as OotzResponse<Frame>
    }
  },

  todo: {
    url: 'todo',
    async create (todo: TodoInput): Promise<OotzResponse<Todo>> {
      const response = await api.post(this.url, todo)
      return response.data as OotzResponse<Todo>
    },
    async update (todo: Todo): Promise<OotzResponse<Todo>> {
      const response = await api.put(this.url, todo)
      return response.data as OotzResponse<Todo>
    },
    async delete (id: string) {
      const response = await api.delete(`${this.url}/${id}`)
      return response.data
    },
    async get (id: string): Promise<OotzResponse<Todo>> {
      const response = await api.get(`${this.url}/${id}`)
      return response.data as OotzResponse<Todo>
    }
  }
}
