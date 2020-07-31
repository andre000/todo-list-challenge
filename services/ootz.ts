/* eslint-disable camelcase */

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export interface Frame {
  id: String;
  title: String;
  created_at: String;
  order: Number;
}

export interface FrameInput extends Omit<Frame, 'id'|'created_at'> {}

export interface Todo {
  id: String;
  frame_id: String;
  title: String;
  description: String;
  created_at: String;
  open: Boolean;
  order: Number;
}

export interface TodoInput extends Omit<Todo, 'id'|'created_at'> {}

export interface OotzResponse {
  /**
   * Código de retorno da request, 1 para sucesso, 0 para erro.
   */
  return_code: Number;

  /**
   * JSON com os dados de resposta.
   */
  data: Array<Frame|Todo> | Frame | Todo;

  /**
   * Caso ocorra algum erro (return_code=0) retorna a descrição.
   */
  messageopcional: String;
}
