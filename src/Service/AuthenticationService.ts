import { inject, injectable } from 'inversify';
import { User } from '../Model/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const IAuthenticationServiceType = 'IAuthenticationService';

export interface IAuthenticationService {
  authenticate(email: string, password: string): Promise<string | null>;
}

@injectable()
export class AuthenticationService implements IAuthenticationService {
  public async authenticate(email: string, password: string): Promise<string | null> {
    
    const user = await User.findOne({ where: { mail: email } });

    if (!user || !user.password) {
      throw new Error('User not found');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user.id, name: user.name }, 'your_jwt_secret', {
      expiresIn: '8h',
    });

    return token;
  }
}
