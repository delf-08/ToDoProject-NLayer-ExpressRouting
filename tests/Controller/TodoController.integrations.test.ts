import request from 'supertest';
import { createApp } from '../../app';
import { mock, MockProxy } from 'jest-mock-extended';
import { ITodoService } from '../../src/Service/TodoService';
import { ITodoCreateRequest, ITodoUpdateRequest } from '../../src/utils/interfaces/IRequestTodo';
import container from '../../inversify.config';
import { ITodoServiceType } from '../../src/Service/TodoService';

describe('TodoController Integration', () => {
  let app: any;
  let todoService: MockProxy<ITodoService>;

  beforeAll(() => {
    todoService = mock<ITodoService>();

    container.rebind<ITodoService>(ITodoServiceType).toConstantValue(todoService);

    app = createApp();
  });

  it('should get all todos', async () => {
    const todos = [
      { id: 1, name: 'Test Todo 1', detail: 'Detail 1', userId: 2 },
      { id: 2, name: 'Test Todo 2', detail: 'Detail 2', userId: 2 },
    ];

    todoService.getAll.mockResolvedValue(todos);

    const response = await request(app).get('/Todo').expect(200);
    expect(response.body).toHaveLength(2);
  });

  it('should create a todo', async () => {
    const createRequest: ITodoCreateRequest = { name: 'New Todo', detail: 'New Detail', userId: 3 };
    const createdTodo = { id: 1, name: 'New Todo', detail: 'New Detail', userId: 3 };

    todoService.create.mockResolvedValue(createdTodo);

    const response = await request(app).post('/Todo').send(createRequest).expect(201);
    expect(response.body.name).toBe('New Todo');
  });
});
