import { TodoController } from '../../src/Controller/TodoController';
import { ITodoService } from '../../src/Service/TodoService';
import { mock, MockProxy } from 'jest-mock-extended';
import { ITodoCreateRequest, ITodoUpdateRequest } from '../../src/utils/interfaces/IRequestTodo';
import { ITodoResponse } from '../../src/utils/interfaces/ITodoResponse';
import { Response } from 'express';

describe('TodoController', () => {
  let todoController: TodoController;
  let todoService: MockProxy<ITodoService>;
  let mockRes: MockProxy<Response>;

  beforeEach(() => {
    todoService = mock<ITodoService>();
    todoController = new TodoController(todoService);

    mockRes = mock<Response>();
  });

  it('should get all todos', async () => {
    const todos: ITodoResponse[] = [
      { id: 1, name: 'Test Todo 1', detail: 'Detail 1', userId: 2 },
      { id: 2, name: 'Test Todo 2', detail: 'Detail 2', userId: 2 },
    ];

    todoService.getAll.mockResolvedValue(todos);

    const result = await todoController.getAll();
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('Test Todo 1');
  });

  it('should get a todo by id', async () => {
    const todo: ITodoResponse = { id: 1, name: 'Test Todo', detail: 'Detail', userId: 2 };

    todoService.getById.mockResolvedValue(todo);

    const result = await todoController.getById(1);
    expect(result.name).toBe('Test Todo');
  });

  it('should create a todo', async () => {
    const createRequest: ITodoCreateRequest = { name: 'New Todo', detail: 'New Detail', userId: 2 };
    const createdTodo: ITodoResponse = { id: 1, name: 'New Todo', detail: 'New Detail', userId: 2 };

    todoService.create.mockResolvedValue(createdTodo);

    const result = await todoController.create(createRequest);
    expect(result.name).toBe('New Todo');
    expect(todoService.create).toHaveBeenCalledWith(createRequest);
  });

  it('should update a todo', async () => {
    const updateRequest: ITodoUpdateRequest = { id: 1, name: 'Updated Todo', detail: 'Updated Detail', userId: 1 };
    const updatedTodo: ITodoResponse = { id: 1, name: 'Updated Todo', detail: 'Updated Detail', userId: 1 };

    todoService.update.mockResolvedValue(updatedTodo);

    const result = await todoController.update( updateRequest.id ,updateRequest);
    expect(result.name).toBe('Updated Todo');
    expect(todoService.update).toHaveBeenCalledWith(updateRequest);
  });

  it('should delete a todo and return 204 status', async () => {
    todoService.delete.mockResolvedValue(true);

    const result = await todoController.delete(1, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(204);
    expect(mockRes.send).toHaveBeenCalled();
    expect(todoService.delete).toHaveBeenCalledWith(1);
  });
});
