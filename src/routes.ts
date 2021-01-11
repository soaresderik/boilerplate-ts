import { Router } from 'express';

import { todoRoutes } from '@modules/todos';
import { userRoutes } from '@modules/users';

const routes = Router();

routes.use('/todos', todoRoutes);
routes.use('/users', userRoutes);

export default routes;
