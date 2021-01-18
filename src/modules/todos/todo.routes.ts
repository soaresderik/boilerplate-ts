import validator from '@middlewares/validator.middleware';
import { Router } from 'express';
import { TodoService } from '.';

const routes = Router();
const todoService = new TodoService();

routes.get('/', async (req, res) => {
  res.json(await todoService.list(req.user));
});

routes.post(
  '/create',
  validator({
    description: 'required|min:10',
  }),
  async (req, res) => {
    const { description } = req.body;
    res.json(await todoService.create({ description, user: req.user }));
  },
);

export default routes;
