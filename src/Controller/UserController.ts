import { inject, injectable } from "inversify";
import { Body, JsonController, Post } from "routing-controllers";
import { IUserService, IUserServiceType } from "../Service/UserService";
import { IUserRequest } from "../utils/interfaces/IUserRequest";
import { IResponseCreated } from "../utils/interfaces/IResponseCreated";

@JsonController('/user')

@injectable()
export class UserController {
    constructor(
        @inject(IUserServiceType)
        private userService: IUserService,
    ){}

    /**
     * @swagger
     * /user:
     *   post:
     *     summary: Create a new user
     *     tags: [User]
     *     description: Creates a new user with the provided details (name, email, and password).
     *     requestBody:
     *       description: User creation data
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/IUserRequest'
     *     responses:
     *       201:
     *         description: User created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/IResponseCreated'
     *       400:
     *         description: Bad request, missing or invalid parameters
     *       500:
     *         description: Server error
     */
    @Post('/')
    async create(
        @Body() data: IUserRequest
    ): Promise<IResponseCreated>{
        return await this.userService.create( data )
    }
}