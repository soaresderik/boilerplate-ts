import { ICreateUserDTO, IUser } from './user.interfaces';
import { mockedUser } from './__mocks__';

export default class UserRepository {
  async create(params: ICreateUserDTO): Promise<IUser> {
    return {
      email: params.email,
      password: params.password,
      id: 'sendeduser',
    };
  }

  async findByEmail(email: string) {
    const user = mockedUser.find(i => i.email === email);
    return user ? { ...user } : undefined;
  }
}
