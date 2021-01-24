import { knex } from '@config/index';
import Repository from '@modules/repository-base';
import { IUser } from './user.interfaces';

export default class UserRepository extends Repository<IUser> {
  constructor(protected db = knex) {
    super('users', db);
  }
}
