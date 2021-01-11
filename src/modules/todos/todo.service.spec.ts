import { TodoService, FakeTodoRepository } from '@modules/todos';
import { mockedUser } from '@modules/users/__mocks__';

describe('Todo Module', () => {
  it('Should be list todos', async () => {
    const fakeTodoRepository = new FakeTodoRepository();
    const todoService = new TodoService(fakeTodoRepository);

    const result = await todoService.list(mockedUser[0]);

    expect(result[0].id).toBe('a');
    expect(result[1].done).toBe(true);
    expect(result.length).toBe(3);
  });

  it('Should be create a new todo', async () => {
    const fakeTodoRepository = new FakeTodoRepository();
    const todoService = new TodoService(fakeTodoRepository);

    const params = { description: 'A mocked todo', user: mockedUser[0] };

    const result = await todoService.create(params);

    expect(result.done).toBe(false);
    expect(result.description).toBe('A mocked todo');
  });
});
