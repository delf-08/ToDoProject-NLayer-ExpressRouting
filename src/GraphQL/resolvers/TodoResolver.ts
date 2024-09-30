import { Resolver, Query, Mutation, Arg, Int } from "type-graphql";
import { inject, injectable } from "inversify";
import { TodoType } from "../types/TodoType";
import { ITodoService, ITodoServiceType } from "../../Service/TodoService";
import { TodoInput } from "../types/TodoInput";
import { ITodoResponse } from "../../utils/interfaces/ITodoResponse";

@injectable()
@Resolver(() => TodoType)
export class TodoResolver {
  constructor(
    @inject(ITodoServiceType)
    private readonly todoService: ITodoService
  ) {}

  @Query(() => [TodoType])
  async getTodos(): Promise<ITodoResponse[]> {
    return this.todoService.getAll();
  }

  @Query(() => TodoType)
  async getTodoById(@Arg("id", () => Int) id: number): Promise<ITodoResponse> {
    return this.todoService.getById(id);
  }

  @Mutation(() => TodoType)
  async createTodo(
    @Arg("data", () => TodoInput) data: TodoInput
  ): Promise<ITodoResponse> {
    return this.todoService.create(data);
  }

  @Mutation(() => TodoType)
  async updateTodo(
    @Arg("id", () => Int) id: number,
    @Arg("data", () => TodoInput) data: TodoInput
  ): Promise<ITodoResponse> {
    return this.todoService.update({ id, ...data });
  }

  @Mutation(() => Boolean)
  async deleteTodo(
    @Arg("id", () => Int) id: number
  ): Promise<boolean> {
    return this.todoService.delete(id);
  }
}
