import { UserService } from '../../src/Service/UserService';
import { IUserRepository } from '../../src/Repository/userRepository';
import { mock, MockProxy } from 'jest-mock-extended';
import bcrypt from 'bcrypt';
import { User } from '../../src/Model/User';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: MockProxy<IUserRepository>;
  let mockCreatedUser: DeepMockProxy<Partial<User>>;

  beforeEach(() => {
    userRepository = mock<IUserRepository>();
    userService = new UserService(userRepository);
    
    // Reset mock objects
    mockCreatedUser = mockDeep<Partial<User>>();
    jest.clearAllMocks();
  });

  it('should create a user with hashed password', async () => {
    const mockUserRequest = {
      name: 'John Doe',
      mail: 'johndoe@example.com',
      password: 'password',
    };

    const hashedPassword = await bcrypt.hash(mockUserRequest.password, 10);

    mockCreatedUser.id = 1;
    mockCreatedUser.name = 'John Doe';
    mockCreatedUser.mail = 'johndoe@example.com';
    mockCreatedUser.password = hashedPassword;

    jest.spyOn(bcrypt, 'hash').mockImplementation(() => Promise.resolve(hashedPassword));
    userRepository.createUser.mockResolvedValue(mockCreatedUser as User);

    const result = await userService.create(mockUserRequest);

    expect(bcrypt.hash).toHaveBeenCalledWith('password', 10);
    expect(userRepository.createUser).toHaveBeenCalledWith({
      name: 'John Doe',
      mail: 'johndoe@example.com',
      password: hashedPassword,
    });
    expect(result).toEqual({ id: 1 });
  });
});
