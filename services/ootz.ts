/* eslint-disable camelcase */

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
