import { UserService, UserRepository } from '@modules/users';
import { usersDraft } from './__mocks__';

describe('User Module', () => {
  it('Should be create a new user', async () => {
    const params = {
      email: 'example@example.com',
      password: 'example',
    };

    UserRepository.prototype.findByEmail = jest
      .fn()
      .mockImplementationOnce(() => null);

    UserRepository.prototype.create = jest
      .fn()
      .mockImplementationOnce(() => usersDraft({ email: params.email })[0]);

    const userService = new UserService();

    const result = await userService.create(params);

    expect(result.email).toBe(params.email);
  });

  it('Should be throw an error if user exist', async () => {
    try {
      const params = {
        email: 'mockeduser@example.com',
        password: 'example',
      };

      UserRepository.prototype.findByEmail = jest.fn().mockImplementationOnce(
        () =>
          usersDraft({
            email: params.email,
          })[0],
      );

      const userService = new UserService();

      await userService.create(params);
    } catch (err) {
      expect(err.statusCode).toBe(406);
      expect(err.message).toBe('E-mail already exists');
    }
  });

  it('Should be logged in', async () => {
    const params = {
      email: 'mockeduser@example.com',
      password: 'example',
    };

    UserRepository.prototype.findByEmail = jest.fn().mockImplementationOnce(
      () =>
        usersDraft({
          email: params.email,
        })[0],
    );

    const userService = new UserService();

    const result = await userService.authenticate(params);

    expect(result.token.length).toBeGreaterThan(100);
  });

  it('Should be throw an authorization error [User not exist]', async () => {
    try {
      const userService = new UserService();

      const params = {
        email: 'example@example.com', // user not exist
        password: 'example',
      };

      await userService.authenticate(params);
    } catch (err) {
      expect(err.statusCode).toBe(401);
      expect(err.message).toBe('Incorrect email/password combination.');
    }
  });

  it('Should be throw an authorization error [Wrong password]', async () => {
    try {
      const userService = new UserService();

      const params = {
        email: 'mockeduser@example.com',
        password: 'example123', // wrong password
      };

      await userService.authenticate(params);
    } catch (err) {
      expect(err.statusCode).toBe(401);
      expect(err.message).toBe('Incorrect email/password combination.');
    }
  });
});
