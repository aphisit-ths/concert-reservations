import {IsEmail, IsNotEmpty, max, maxLength, min, minLength} from 'class-validator';

export class CreateAccountDto {
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    password: string

    admin?: boolean
}
