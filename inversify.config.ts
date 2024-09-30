import { Container } from 'inversify';
import { ITodoRepository, ITodoRepositoryType, TodoRepository } from './src/Repository/TodoRepository';
import { ITodoService, ITodoServiceType, TodoService } from './src/Service/TodoService';
import { AuthenticationService, IAuthenticationService, IAuthenticationServiceType } from './src/Service/AuthenticationService';
import { TodoController } from './src/Controller/TodoController';
import { AuthenticationController } from './src/Controller/AuthenticationController';
import { IUserRepository, IUserRepositoryType, UserRepository } from './src/Repository/userRepository';
import { IUserService, IUserServiceType, UserService } from './src/Service/UserService';
import { UserController } from './src/Controller/UserController';
import { AuthMiddleware } from './src/MiddleWares/AuthMiddleware';
import { ApiAccessCheckMiddleware } from './src/MiddleWares/ApiAccesCheckMiddleware';
import { TodoResolver } from './src/GraphQL/resolvers/TodoResolver';
import { UserResolver } from './src/GraphQL/resolvers/UserResolver';

const container = new Container();

container.bind<ITodoRepository>(ITodoRepositoryType).to(TodoRepository);
container.bind<IUserRepository>(IUserRepositoryType).to(UserRepository);

container.bind<ITodoService>(ITodoServiceType).to(TodoService);
container.bind<IUserService>(IUserServiceType).to(UserService);
container.bind<IAuthenticationService>(IAuthenticationServiceType).to(AuthenticationService);
container.bind(AuthMiddleware).to(AuthMiddleware);
container.bind(ApiAccessCheckMiddleware).to(ApiAccessCheckMiddleware);

container.bind(TodoResolver).toSelf();
container.bind(UserResolver).toSelf();

container.bind<TodoController>(TodoController).toSelf();
container.bind<UserController>(UserController).toSelf();
container.bind<AuthenticationController>(AuthenticationController).toSelf();

export default container;