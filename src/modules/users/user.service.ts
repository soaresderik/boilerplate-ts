import { sign } from 'jsonwebtoken';
import HttpException from '@shared/errors/HttpException';
import { generateHash, compareHash } from '@shared/helpers/hashprovider';
import { jwtConfig } from '@config/index';
import { ICreateUserDTO, IAuthResponse } from './user.interfaces';
import { UserRepository } from '.';

export default class UserService {
  constructor(
    private userRepository = new UserRepository(),
    private helper = { generateHash, compareHash },
  ) {}

  public async create({
    email,
    password,
    name,
  }: ICreateUserDTO): Promise<{ id: string }> {
    const checkUserExists = await this.userRepository.findOne({ email });

    if (checkUserExists) {
      throw new HttpException('E-mail already exists', 406);
    }

    const passwordHash = await this.helper.generateHash(password);

    const result = await this.userRepository.store({
      name,
      email,
      password: passwordHash,
    });

    return result;
  }

  public async authenticate({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<IAuthResponse> {
    const user = await this.userRepository.findOne({ email });

    if (!user || !user.password) {
      throw new HttpException('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await this.helper.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new HttpException('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = jwtConfig;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    delete user.password;
    delete user.createdAt;
    delete user.deletedAt;

    return {
      user,
      token,
    };
  }
}
