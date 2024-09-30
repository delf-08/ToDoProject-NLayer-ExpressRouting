export interface IUserRequest {
    name: string;
    mail: string;
    password: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     IUserRequest:
 *       type: object
 *       required:
 *         - name
 *         - mail
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: The user's full name
 *         mail:
 *           type: string
 *           description: The user's email address
 *         password:
 *           type: string
 *           description: The user's password
 */
