import { Resolver, Mutation, Arg } from "type-graphql";
import { inject, injectable } from "inversify";
import { IUserService, IUserServiceType } from "../../Service/UserService";
import { UserType } from "../types/UserType";
import { UserInput } from "../types/UserInput";
import { ResponseCreatedType } from "../types/ResponseCreatedType";

@injectable()
@Resolver(() => UserType)
export class UserResolver {
  constructor(
    @inject(IUserServiceType)
    private readonly userService: IUserService
  ) {}

  @Mutation(() => ResponseCreatedType)
  async createUser(
    @Arg("data", () => UserInput) data: UserInput
  ): Promise<ResponseCreatedType> {
    const response = await this.userService.create(data);
    return { id: response.id };
  }
}
