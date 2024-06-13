import {BadRequestException, Injectable} from '@nestjs/common';
import {LoginResponseDto} from "./dto/login-auth.dto";
import {User} from "@prisma/client";
import {JwtService} from '@nestjs/jwt';
import {CreateAccountDto} from "./dto/create-account.dto";
import {PrismaService} from "../prisma/prisma.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,) {
    }

    async login(user: User): Promise<LoginResponseDto> {
        const payload = {username: user.username, sub: user.id, admin: user.isAdmin}
        const signed: string = this.jwtService.sign(payload)
        return {accessKey: signed}
    }

    async createAccount(request: CreateAccountDto): Promise<User | null> {
        const existingUser = await this.prisma.user.findUnique({where: {username: request.username}})
        if (existingUser) {
            throw new BadRequestException("this username is already existing !")
        }
        const hashedPassword = await bcrypt.hash(request.password, 10);
        return this.prisma.user.create({
            data: {
                username: request.username,
                isAdmin: request.admin,
                password: hashedPassword
            }
        });
    }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.prisma.user.findUnique(
            {
                where: {
                    username: username
                }
            }
        )
        if (user && (await bcrypt.compare(pass, user.password))) {
            return user;
        }
        return null;
    }

    async getMe(user: User): Promise<User> {
        return this.prisma.user.findUnique(
            {
                where: {
                    username: user.username
                }
            }
        );
    }
}
