import { TodoService } from '../../src/Service/TodoService';
import { ITodoRepository } from '../../src/Repository/TodoRepository';
import { mock, MockProxy } from 'jest-mock-extended';
import { ITodoCreateRequest, ITodoUpdateRequest } from '../../src/utils/interfaces/IRequestTodo';
import { TodoAttributes } from '../../src/Model/Todo';

describe('TodoService', () => {
  let todoService: TodoService;
  let todoRepository: MockProxy<ITodoRepository>;

  beforeEach(() => {
    todoRepository = mock<ITodoRepository>();
    todoService = new TodoService(todoRepository);
  });

  it('should get all todos', async () => {
    const todos: TodoAttributes[] = [
      { id: 1, name: 'Test Todo 1', detail: 'Detail 1' },
      { id: 2, name: 'Test Todo 2', detail: 'Detail 2' },
    ];

    todoRepository.getAll.mockResolvedValue(todos);

    const result = await todoService.getAll();
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('Test Todo 1');
  });

  it('should get a todo by id', async () => {
    const todo: TodoAttributes = { id: 1, name: 'Test Todo', detail: 'Detail' };

    todoRepository.getById.mockResolvedValue(todo);

    const result = await todoService.getById(1);
    expect(result.name).toBe('Test Todo');
  });

  it('should create a todo', async () => {
    const createRequest: ITodoCreateRequest = { name: 'New Todo', detail: 'New Detail' };
    const createdTodo: TodoAttributes = { id: 1, name: 'New Todo', detail: 'New Detail' };

    todoRepository.create.mockResolvedValue(createdTodo);

    const result = await todoService.create(createRequest);
    expect(result.name).toBe('New Todo');
    expect(todoRepository.create).toHaveBeenCalledWith({ name: 'New Todo', detail: 'New Detail' });
  });

  it('should update a todo', async () => {
    const updateRequest: ITodoUpdateRequest = { id: 1, name: 'Updated Todo', detail: 'Updated Detail' };
    const updatedTodo: TodoAttributes = { id: 1, name: 'Updated Todo', detail: 'Updated Detail' };

    todoRepository.update.mockResolvedValue(updatedTodo);

    const result = await todoService.update(updateRequest);
    expect(result.name).toBe('Updated Todo');
    expect(todoRepository.update).toHaveBeenCalledWith(updateRequest);
  });

  it('should delete a todo', async () => {
    todoRepository.delete.mockResolvedValue(true);

    const result = await todoService.delete(1);
    expect(result).toBe(true);
    expect(todoRepository.delete).toHaveBeenCalledWith(1);
  });
});
