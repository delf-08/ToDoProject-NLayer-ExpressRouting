import { UserController } from '../../src/Controller/UserController';
import { IUserService } from '../../src/Service/UserService';
import { mock, MockProxy } from 'jest-mock-extended';
import { IUserRequest } from '../../src/utils/interfaces/IUserRequest';

describe('UserController', () => {
  let userController: UserController;
  let userService: MockProxy<IUserService>;

  beforeEach(() => {
    userService = mock<IUserService>();
    userController = new UserController(userService);
    jest.clearAllMocks();
  });

  it('should call userService.create and return the result', async () => {
    const mockUserRequest: IUserRequest = {
      name: 'John Doe',
      mail: 'johndoe@example.com',
      password: 'password',
    };

    const mockResponse = { id: 1 };

    userService.create.mockResolvedValue(mockResponse);

    const result = await userController.create(mockUserRequest);

    expect(userService.create).toHaveBeenCalledWith(mockUserRequest);
    expect(result).toEqual(mockResponse);
  });
});
