import { inject, injectable } from 'inversify';
import { Body, JsonController, Post } from 'routing-controllers';
import { IAuthenticationService, IAuthenticationServiceType } from '../Service/AuthenticationService';

@JsonController('/auth')
@injectable()
export class AuthenticationController {
  constructor(
    @inject(IAuthenticationServiceType)
    private authService: IAuthenticationService
  ) {}

  /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: Authenticate user and generate token
   *     tags: [Authentication]
   *     description: Authenticate the user by email and password, and return a JWT token if the credentials are valid.
   *     requestBody:
   *       description: Email and password for login
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 description: User's email
   *               password:
   *                 type: string
   *                 description: User's password
   *             required:
   *               - email
   *               - password
   *     responses:
   *       200:
   *         description: Successful authentication
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *                   description: JWT token
   *       401:
   *         description: Invalid credentials
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Invalid credentials
   *       500:
   *         description: Server error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Internal server error
   */
  @Post('/login')
  async login(@Body() loginRequest: { email: string, password: string }) {
    const { email, password } = loginRequest;

    try {
      const token = await this.authService.authenticate(email, password);

      if (!token) {
        return { message: 'Invalid credentials' };
      }

      return { token };
    } catch (error) {
      return { message: error };
    }
  }
}
