import { mockedUser } from '@modules/users/__mocks__';

export const mockedTodos = [
  {
    id: 'a',
    description: 'Some short mocked description',
    done: false,
    user: mockedUser[0],
  },
  {
    id: 'b',
    description: 'Some short mocked description',
    done: true,
    user: mockedUser[0],
  },
  {
    id: 'c',
    description: 'Some short mocked description',
    done: false,
    user: mockedUser[0],
  },
];
