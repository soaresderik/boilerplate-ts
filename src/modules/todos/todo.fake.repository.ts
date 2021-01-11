import { ITodoRepository, ICreateToDoDTO } from './todo.interfaces';

import { mockedTodos } from './__mocks__';

export default class FakeTodoRepository implements ITodoRepository {
  async list() {
    return mockedTodos;
  }

  async create(params: ICreateToDoDTO) {
    const data = {
      ...params,
      id: Date.now().toString(),
      done: false,
    };

    return data;
  }
}
