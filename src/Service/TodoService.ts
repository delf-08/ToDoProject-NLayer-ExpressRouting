import { inject, injectable } from "inversify";
import { ITodoResponse } from "../utils/interfaces/ITodoResponse";
import { ITodoRepository, ITodoRepositoryType } from "../Repository/TodoRepository";
import { TodoResponseMapper } from "../utils/mappers/TodoResponseMapper";
import { ITodoCreateRequest, ITodoUpdateRequest } from "../utils/interfaces/IRequestTodo";
import { TodoAttributes } from "../Model/Todo";
import { todoCreateValidator } from "../utils/validators/TodoValidator";
import { IUserRepository, IUserRepositoryType } from "../Repository/userRepository";

export const ITodoServiceType = 'ITodoService';

export interface ITodoService {
    getAll(): Promise<ITodoResponse[]>;
    getById(id: number): Promise<ITodoResponse>;
    create(data: ITodoCreateRequest): Promise<ITodoResponse>;
    update(data: ITodoUpdateRequest): Promise<ITodoResponse>;
    delete(id: number): Promise<boolean>;
}

@injectable()
export class TodoService implements ITodoService {
    constructor(
        @inject(ITodoRepositoryType)
        private todoRepository: ITodoRepository,
        @inject(IUserRepositoryType)
        private userRepository: IUserRepository
    ) {}

    public async getAll(): Promise<ITodoResponse[]> {
        const todos = await this.todoRepository.getAll();
        return TodoResponseMapper.mapList(todos);
    }

    public async getById(id: number): Promise<ITodoResponse> {
        const todo = await this.todoRepository.getById(id);
        return TodoResponseMapper.map(todo);
    }

    public async create(data: ITodoCreateRequest): Promise<ITodoResponse> {

        const user = await this.userRepository.findUserById( data.userId )

        await todoCreateValidator(user);

        const todoData = this.mapCreateRequestToTodoAttributes(data);
        const newTodo = await this.todoRepository.create(todoData);
        return TodoResponseMapper.map(newTodo);
    }

    public async update(data: ITodoUpdateRequest): Promise<ITodoResponse> {
        const todoData = this.mapUpdateRequestToTodoAttributes(data);
        const updatedTodo = await this.todoRepository.update(todoData);
        return TodoResponseMapper.map(updatedTodo);
    }

    public async delete(id: number): Promise<boolean> {
        const deleted = await this.todoRepository.delete(id);
        if (deleted) {
            return true;
        }
        return false;
    }

    private mapCreateRequestToTodoAttributes(data: ITodoCreateRequest): Partial<TodoAttributes> {
        return {
            name: data.name,
            detail: data.detail,
            userId: data.userId
        };
    }

    private mapUpdateRequestToTodoAttributes(data: ITodoUpdateRequest): Partial<TodoAttributes> {
        return {
            id: data.id,
            name: data.name,
            detail: data.detail,
        };
    }
}
