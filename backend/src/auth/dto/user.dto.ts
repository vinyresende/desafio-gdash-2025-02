import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class UserSignUpDTO {
    @IsNotEmpty()
    @IsString()
    username: string

    @IsEmail()
    email: string

    @IsNotEmpty()
    @MinLength(8)
    password: string
}

export class UserSignInDTO {
    @IsEmail()
    email: string

    @IsNotEmpty()
    password: string
}
