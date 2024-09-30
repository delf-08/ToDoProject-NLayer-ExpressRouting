import request from 'supertest';
import { createApp } from '../../app';
import { IUserService } from '../../src/Service/UserService';
import { mock, MockProxy } from 'jest-mock-extended';
import { IUserRequest } from '../../src/utils/interfaces/IUserRequest';
import { UserController } from '../../src/Controller/UserController';
import container from '../../inversify.config';
import { IUserServiceType } from '../../src/Service/UserService'; 

describe('UserController Integration', () => {
  let app: any;
  let userService: MockProxy<IUserService>;

  beforeAll(() => {
    userService = mock<IUserService>();

    container.rebind<IUserService>(IUserServiceType).toConstantValue(userService);

    app = createApp();
  });

  it('POST /user should return 201 and create user', async () => {
    const mockUserRequest: IUserRequest = {
      name: 'John Doe',
      mail: 'johndoe@example.com',
      password: 'password123',
    };

    const mockResponse = { id: 1 };

    userService.create.mockResolvedValue(mockResponse);

    const response = await request(app)
      .post('/user')
      .send(mockUserRequest)
      .expect(201);

    expect(response.body).toEqual(mockResponse);
    expect(userService.create).toHaveBeenCalledWith(mockUserRequest);
  });
});
