import { inject, injectable } from "inversify";
import { Body, Delete, Get, JsonController, Param, Post, Put, Res } from "routing-controllers";
import { ITodoService, ITodoServiceType } from "../Service/TodoService";
import { ITodoResponse } from "../utils/interfaces/ITodoResponse";
import { ITodoCreateRequest, ITodoUpdateRequest } from "../utils/interfaces/IRequestTodo";
import { Response } from "express";

@JsonController('/Todo')
@injectable()
export class TodoController {
    constructor(
        @inject(ITodoServiceType)
        private todoService: ITodoService
    ) {}

    /**
     * @swagger
     * /Todo:
     *   get:
     *     summary: Get all todos
     *     tags: [Todo]
     *     description: Retrieve a list of all todos
     *     responses:
     *       200:
     *         description: List of todos
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/ITodoResponse'
     */
    @Get('/')
    async getAll(): Promise<ITodoResponse[]> {
        return await this.todoService.getAll();
    }

    /**
     * @swagger
     * /Todo/{id}:
     *   get:
     *     summary: Get a todo by ID
     *     tags: [Todo]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: Numeric ID of the todo to retrieve
     *     responses:
     *       200:
     *         description: A single todo
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ITodoResponse'
     */
    @Get('/:id')
    async getById(@Param('id') id: number): Promise<ITodoResponse> {
        return await this.todoService.getById(id);
    }

    /**
     * @swagger
     * /Todo:
     *   post:
     *     summary: Create a new todo
     *     tags: [Todo]
     *     requestBody:
     *       description: Data to create a new todo
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/ITodoCreateRequest'
     *     responses:
     *       201:
     *         description: Todo created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ITodoResponse'
     */
    @Post('/')
    async create(@Body() data: ITodoCreateRequest): Promise<ITodoResponse> {
        return await this.todoService.create(data);
    }

    /**
     * @swagger
     * /Todo/{id}:
     *   put:
     *     summary: Update a todo by ID
     *     tags: [Todo]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: Numeric ID of the todo to update
     *     requestBody:
     *       description: Data to update the todo
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/ITodoUpdateRequest'
     *     responses:
     *       200:
     *         description: Todo updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ITodoResponse'
     */
    @Put('/:id')
    async update(@Param('id') id: number, @Body() data: ITodoUpdateRequest): Promise<ITodoResponse> {
        return await this.todoService.update(data);
    }

    /**
     * @swagger
     * /Todo/{id}:
     *   delete:
     *     summary: Delete a todo by ID
     *     tags: [Todo]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: Numeric ID of the todo to delete
     *     responses:
     *       204:
     *         description: Todo deleted successfully
     */
    @Delete('/:id')
    async delete(@Param('id') id: number, @Res() res: Response): Promise<void> {
        const deleted = await this.todoService.delete(id);
        if (deleted) {
            res.status(204).send();
        }
    }
}
