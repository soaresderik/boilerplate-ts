import { usersDraft } from '@modules/users/__mocks__';
import { ITodo } from './todo.interfaces';

export const mockedTodos = (wrap?: Partial<ITodo>) => [
  {
    id: wrap?.id || 'a',
    description: wrap?.description || 'Some short mocked description',
    done: wrap?.done || false,
    user: usersDraft()[0],
  },
  {
    id: 'b',
    description: 'Some short mocked description',
    done: true,
    user: usersDraft()[0],
  },
  {
    id: 'c',
    description: 'Some short mocked description',
    done: false,
    user: usersDraft()[0],
  },
];
