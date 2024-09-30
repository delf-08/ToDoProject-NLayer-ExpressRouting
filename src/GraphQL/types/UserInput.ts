import { InputType, Field } from "type-graphql";

@InputType()
export class UserInput {
  @Field()
  name!: string;

  @Field()
  mail!: string;

  @Field()
  password!: string;
}
