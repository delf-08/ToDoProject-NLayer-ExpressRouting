import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import jwt from 'jsonwebtoken';
import { injectable } from 'inversify';

@injectable()
@Middleware({ type: 'before' })
export class AuthMiddleware implements ExpressMiddlewareInterface {
  async use(req: any, res: any, next: (err?: any) => any) {

    if (req.path === '/auth/login' || '/docs') {
        return next();
    }

    const token = req.headers['authorization']?.split(' ')[1];


    if (!token) {
      return res.status(401).json({ message: 'Authorization token is required' });
    }

    try {
      const decoded = jwt.verify(token, 'your_jwt_secret');
      req.user = decoded;
      next();
    } catch (err) {
      console.error('JWT verification error:', err);
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  }
}
