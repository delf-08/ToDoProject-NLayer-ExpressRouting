import { injectable } from "inversify";
import { Todo, TodoAttributes } from "../Model/Todo";

export const ITodoRepositoryType = 'ITodoRepository';

export interface ITodoRepository {
  getAll(): Promise<TodoAttributes[]>;
  getById(id: number): Promise<TodoAttributes>;
  create(data: Partial<TodoAttributes>): Promise<TodoAttributes>;
  update(data: Partial<TodoAttributes>): Promise<TodoAttributes>;
  delete(id: number): Promise<boolean>;
}

@injectable()
export class TodoRepository implements ITodoRepository {
  public async getAll(): Promise<TodoAttributes[]> {
    const todos = await Todo.findAll();
    return todos.map(todo => todo.get({ plain: true }) as TodoAttributes);
  }

  public async getById(id: number): Promise<TodoAttributes> {
    const todo = await Todo.findOne({ where: { id }});
    if (!todo) {
      throw new Error(`Todo with id ${id} not found`);
    }
    return todo.get({ plain: true }) as TodoAttributes;
  }

  public async create(data: Partial<TodoAttributes>): Promise<TodoAttributes> {
    const newTodo = await Todo.create(data);
    return newTodo.get({ plain: true }) as TodoAttributes;
}

public async update(data: Partial<TodoAttributes>): Promise<TodoAttributes> {
    const todo = await Todo.findOne({ where: { id: data.id }});
    if (!todo) {
        throw new Error(`Todo with id ${data.id} not found`);
    }
    await todo.update(data);
    return todo.get({ plain: true }) as TodoAttributes;
}

public async delete(id: number): Promise<boolean> {
    const todo = await Todo.findOne({ where: { id }});
    if (!todo) {
        return false;
    }
    await todo.destroy();
    return true;
}
}
