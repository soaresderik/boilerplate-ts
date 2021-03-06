import validator from '@middlewares/validator.middleware';
import { Router } from 'express';
import { UserService } from '.';

const routes = Router();
const userService = new UserService();

routes.post(
  '/create',
  validator({
    email: 'required|email',
    password: 'required|min:6|max:12',
  }),
  async (req, res) => {
    const { email, password } = req.body;

    res.json(await userService.create({ email, password }));
  },
);

routes.post('/auth', async (req, res) => {
  const { email, password } = req.body;
  res.json(
    await userService.authenticate({
      email,
      password,
    }),
  );
});

export default routes;
