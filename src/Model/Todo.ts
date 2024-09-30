import { Table, Column, Model, DataType, AllowNull, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './User';

export interface TodoAttributes {
  id: number;
  name: string;
  detail?: string;
  userId: number;
}

@Table({
  tableName: 'todos',
  timestamps: true,
})
export class Todo extends Model<TodoAttributes, Partial<TodoAttributes>> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  name!: string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING,
  })
  detail?: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}
