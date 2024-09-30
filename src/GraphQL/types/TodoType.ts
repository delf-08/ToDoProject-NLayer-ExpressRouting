import { ObjectType, Field, Int } from "type-graphql";
import { UserType } from "./UserType";

@ObjectType()
export class TodoType {
  @Field(() => Int)
  id!: number;

  @Field()
  name!: string;

  @Field({ nullable: true })
  detail?: string;

  @Field(() => Int)
  userId!: number;

  @Field(() => UserType)
  user!: UserType;
}
