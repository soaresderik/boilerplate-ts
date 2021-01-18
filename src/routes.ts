import { Router } from 'express';

import { todoRoutes } from '@modules/todos';
import { userRoutes } from '@modules/users';
import checkAuth from '@middlewares/auth.middleware';

const routes = Router();

routes.use('/todos', checkAuth, todoRoutes);
routes.use('/users', userRoutes);

export default routes;
