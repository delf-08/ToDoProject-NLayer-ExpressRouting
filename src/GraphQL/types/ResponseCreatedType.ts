import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
export class ResponseCreatedType {
  @Field(() => Int)
  id!: number;
}
