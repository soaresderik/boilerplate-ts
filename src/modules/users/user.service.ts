import { sign } from 'jsonwebtoken';
import HttpException from '@shared/errors/HttpException';
import { generateHash, compareHash } from '@shared/helpers/hashprovider';
import { jwtConfig } from '@config/index';
import { ICreateUserDTO, IUser, IAuthResponse } from './user.interfaces';
import { UserRepository } from '.';

export default class UserService {
  constructor(
    private userRepository = new UserRepository(),
    private helper = { generateHash, compareHash },
  ) {}

  public async create({ email, password }: ICreateUserDTO): Promise<IUser> {
    const checkUserExists = await this.userRepository.findByEmail(email);

    if (checkUserExists) {
      throw new HttpException('E-mail already exists', 406);
    }

    const passwordHash = await this.helper.generateHash(password);

    const user = await this.userRepository.create({
      email,
      password: passwordHash,
    });

    return user;
  }

  public async authenticate({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<IAuthResponse> {
    const user = await this.userRepository.findByEmail(email);

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
