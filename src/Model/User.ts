import { Table, Column, Model, DataType, AllowNull, HasMany } from 'sequelize-typescript';
import { Todo } from './Todo';

export interface UserAttributes {
  id: number;
  name?: string;
  mail?: string;
  password?: string;
  todos: Todo[];
}

@Table({
  tableName: 'user',
})
export class User extends Model<UserAttributes, Partial<UserAttributes>> {
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @AllowNull(true)
  @Column(DataType.STRING)
  name?: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  mail?: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  password?: string;

  @HasMany(() => Todo)
  todos!: Todo[];
}
