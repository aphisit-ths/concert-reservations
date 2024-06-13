import {IsNotEmpty} from 'class-validator';

export class CreateAccountDto {
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    password: string

    admin?: boolean
}
