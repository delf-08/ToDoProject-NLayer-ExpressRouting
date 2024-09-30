import { inject, injectable } from "inversify";
import { IResponseCreated } from "../utils/interfaces/IResponseCreated";
import { IUserRequest } from "../utils/interfaces/IUserRequest";
import { IUserRepository, IUserRepositoryType } from "../Repository/userRepository";
import { User, UserAttributes } from "../Model/User";
import bcrypt from "bcrypt";
import { ResponseCreatedType } from "../GraphQL/types/ResponseCreatedType";

export const IUserServiceType = 'IUserService';

export interface IUserService {
    create(data: IUserRequest): Promise<ResponseCreatedType>
    findById( id: number ): Promise<UserAttributes>
}

@injectable()
export class UserService implements IUserService {
    constructor(
        @inject(IUserRepositoryType)
        private userRepository: IUserRepository,
    ){}

    public async create(data: IUserRequest): Promise<ResponseCreatedType> {
        const dataToCreate = await this.mapToCreate(data);
        const user = await this.userRepository.createUser(dataToCreate);
        return { id: user.id } as ResponseCreatedType;
    }

    public async findById(id: number): Promise<UserAttributes> {
        const user = await this.userRepository.findUserById( id );
        return user;
    }

    private async mapToCreate( data: IUserRequest ): Promise<Partial<UserAttributes>> {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        return {
            name: data.name,
            mail: data.mail,
            password: hashedPassword
        };
    }
}