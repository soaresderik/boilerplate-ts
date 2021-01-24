import { IUser } from '@modules/users/user.interfaces';
import { ICreateToDoDTO } from './todo.interfaces';
import { TodoRepository } from '.';

export default class TodoService {
  constructor(private todoRepository = new TodoRepository()) {}

  async list(user: IUser) {
    return this.todoRepository.find({ userId: user.id });
  }

  async create(params: ICreateToDoDTO) {
    const data = await this.todoRepository.store({
      description: params.description,
      userId: params.user.id,
    });
    return data;
  }
}
