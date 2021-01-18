import { knex } from '@config/index';
import { ICreateUserDTO, IUser } from './user.interfaces';

export default class UserRepository {
  async create(params: ICreateUserDTO): Promise<{ id: string }> {
    const [id] = await knex<IUser>('users')
      .insert({
        email: params.email,
        name: params.name,
        password: params.password,
      })
      .returning('id');

    return {
      id,
    };
  }

  async findByEmail(email: string) {
    const user = await knex<IUser>('users')
      .select('*')
      .where('email', email)
      .first();

    return user;
  }
}
