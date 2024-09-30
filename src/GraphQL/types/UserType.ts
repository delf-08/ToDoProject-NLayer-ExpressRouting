import { ObjectType, Field, Int } from "type-graphql";
import { TodoType } from "./TodoType";

@ObjectType()
export class UserType {
  @Field(() => Int)
  id!: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  mail?: string;

  @Field({ nullable: true })
  password?: string;

  @Field(() => [TodoType], { nullable: "items" })
  todos?: TodoType[];
}
