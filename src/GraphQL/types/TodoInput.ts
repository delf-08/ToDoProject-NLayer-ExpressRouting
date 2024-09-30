import { InputType, Field, Int } from "type-graphql";

@InputType()
export class TodoInput {
  @Field()
  name!: string;

  @Field({ nullable: true })
  detail?: string;

  @Field(() => Int)
  userId!: number;
}
