import { IUser } from '@modules/users/user.interfaces';
import { ITodo, ICreateToDoDTO } from './todo.interfaces';
import { mockedTodos } from './__mocks__';

export default class TodoRepository {
  public mock? = mockedTodos();

  async list(user: IUser): Promise<ITodo[]> {
    return this.mock?.filter(i => i.user.id === user.id) || [];
  }

  async create(params: ICreateToDoDTO): Promise<ITodo> {
    const id = Date.now().toString();

    const data = {
      ...params,
      id,
      done: false,
    };

    if (this.mock) this.mock.push(data);

    return data;
  }
}
