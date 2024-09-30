export class LoginResponse {
    token!: string;
}

export class LoginRequest {
    email!: string;
    password!: string;
}

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateUserRequest {
  @IsNotEmpty()
  @IsString()
  @Expose()
  name!: string;

  @IsNotEmpty()
  @IsEmail()
  @Expose()
  mail!: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  password!: string;
}


export class CreateUserResponse {
    @Expose()
    id!: number;
  }


