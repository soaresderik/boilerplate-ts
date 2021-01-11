import { Router } from 'express';
import { UserService } from '.';

const routes = Router();
const userService = new UserService();

routes.post('/create', async (req, res) => {
  const { email, password } = req.body;

  res.json(await userService.create({ email, password }));
});

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
