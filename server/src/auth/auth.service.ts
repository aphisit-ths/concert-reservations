import {BadRequestException, Injectable} from '@nestjs/common'
import {LoginResponseDto} from './dto/login-auth.dto'
import {User} from '@prisma/client'
import {JwtService} from '@nestjs/jwt'
import {CreateAccountDto} from './dto/create-account.dto'
import {PrismaService} from '../prisma/prisma.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {
    }

    async login(user: User): Promise<LoginResponseDto> {
        try {
            const payload = {
                username: user.username.trim().toLowerCase(),
                sub: user.id,
                admin: user.isAdmin,
            }
            const signed: string = this.jwtService.sign(payload)
            return {accessKey: signed}
        } catch (e) {
            throw e
        }
    }

    async createAccount(request: CreateAccountDto): Promise<User | null> {
        try {
            const usernameRequest = request.username.trim().toLowerCase()
            const passwordRequest = request.password.trim()

            if (passwordRequest.length < 8) {
                throw new BadRequestException('password length must greater than 8')
            }

            const existingUser = await this.prisma.user.findUnique({
                where: {username: usernameRequest},
            })

            if (existingUser) {
                throw new BadRequestException('this username is already existing !')
            }

            const hashedPassword = await bcrypt.hash(request.password, 10)
            return this.prisma.user.create({
                data: {
                    username: usernameRequest,
                    isAdmin: request.admin,
                    password: hashedPassword,
                },
            })
        } catch (e) {
            throw e
        }
    }

    async validateUser(username: string, pass: string): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: {
                username: username,
            },
        })
        if (!user) {
            return null
        }
        const matchPassword = await bcrypt.compare(pass, user.password)
        if (!matchPassword) {
            return null
        }
        return user
    }

    async getMe(user: User): Promise<Me> {
        try {
            const me = await this.prisma.user.findUnique({
                where: {
                    username: user.username,
                },
            })

            if (me) {
                return {username: me.username, isAdmin: me.isAdmin}
            }

            return null
        } catch (e) {
            throw e
        }
    }
}
