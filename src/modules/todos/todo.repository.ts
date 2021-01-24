import Repository from '@modules/repository-base';
import { knex } from '@config/index';
import { ITodo } from './todo.interfaces';

export default class TodoRepository extends Repository<ITodo> {
  constructor(db = knex) {
    super('todos', db);
  }
}
