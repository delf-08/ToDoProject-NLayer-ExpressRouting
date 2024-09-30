import { injectable } from 'inversify';
import { User, UserAttributes } from '../Model/User';
import { Todo } from '../Model/Todo';

export const IUserRepositoryType = 'IUserRepository';

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  createUser(data: Partial<UserAttributes>): Promise<User>;
  findUserById( userId: number ): Promise<UserAttributes>
}

@injectable()
export class UserRepository implements IUserRepository {
  public async findByEmail(email: string): Promise<User | null> {
    return await User.findOne({ where: { mail: email } });
  }

  public async createUser(data: Partial<UserAttributes>): Promise<User> {
    const user = await User.create(data);
    return user;
  }

  public async findUserById(userId: number): Promise<UserAttributes> {
    const user = await User.findOne({ where: { id: userId }, include: [{ model: Todo, as: 'todos' }], });
    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }
    return user.get({ plain: true }) as UserAttributes;
  }
}
