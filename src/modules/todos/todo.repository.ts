import { IUser } from '@modules/users/user.interfaces';
import { knex } from '@config/index';
import { ITodo, ICreateToDoDTO } from './todo.interfaces';
import { mockedTodos } from './__mocks__';

export default class TodoRepository {
  public mock? = mockedTodos();

  async list(user: IUser): Promise<ITodo[]> {
    const result = await knex<ITodo>('todos')
      .select('*')
      .where('userId', user.id);

    return result;
  }

  async create(params: ICreateToDoDTO): Promise<ITodo> {
    const [result] = await knex<ITodo>('todos')
      .insert({
        description: params.description,
        userId: params.user.id,
      })
      .returning('*');

    const data = {
      ...params,
      id: result.id,
      done: false,
    };

    return data;
  }
}
