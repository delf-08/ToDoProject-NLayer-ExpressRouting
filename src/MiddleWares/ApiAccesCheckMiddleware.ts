import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { injectable } from 'inversify';

@Middleware({ type: 'before' })
@injectable()
export class ApiAccessCheckMiddleware implements ExpressMiddlewareInterface {

  private static readonly API_KEY = '12345';

  private logger(message: string): void {
    console.log(`[API Access Check]: ${message}`);
  }

  public use(req: any, res: any, next: (err?: any) => any): void {
    const { apikey } = req.headers;

    const openPaths = [
      '/api-docs', 
      '/docs',  
      '/swagger-ui.css',
      '/swagger-ui-bundle.js',
      '/swagger-ui-standalone-preset.js',
      '/graphql'
    ];

    const isPathOpen = openPaths.some(openPath => req.path.startsWith(openPath));

    if (isPathOpen) {
      return next();
    }

    if (!apikey) {
        this.logger('Missing API key in headers');
        return res.status(400).json({ message: 'API key is missing from headers' });
    }

    if (apikey !== ApiAccessCheckMiddleware.API_KEY) {
        this.logger(`${apikey} does not match the expected API key`);
        return res.status(401).json({ message: 'INVALID_API_KEY' });
    }

    next();
  }
}
