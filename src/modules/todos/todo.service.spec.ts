import { TodoService, TodoRepository } from '@modules/todos';
import { usersDraft } from '@modules/users/__mocks__';
import { mockedTodos } from './__mocks__';

describe('Todo Module', () => {
  it('Should be list todos', async () => {
    TodoRepository.prototype.find = jest
      .fn()
      .mockImplementationOnce(() => mockedTodos());
    const todoService = new TodoService();

    const result = await todoService.list(usersDraft()[0]);

    expect(result[0].id).toBe('a');
    expect(result[1].done).toBe(true);
    expect(result.length).toBe(3);
  });

  it('Should be create a new todo', async () => {
    const params = { description: 'A mocked todo', user: usersDraft()[0] };

    TodoRepository.prototype.store = jest.fn().mockImplementationOnce(
      () =>
        mockedTodos({
          description: params.description,
        })[0],
    );
    const todoService = new TodoService();

    const result = await todoService.create(params);

    expect(result.done).toBe(false);
    expect(result.description).toBe('A mocked todo');
  });
});
