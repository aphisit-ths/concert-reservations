import {Module} from '@nestjs/common'
import {AuthService} from './auth.service'
import {AuthController} from './auth.controller'
import {PassportModule} from '@nestjs/passport'
import {JwtModule} from '@nestjs/jwt'
import {JwtStrategy} from './strategies/jwt.strategy'
import {LocalStrategy} from './strategies/local.strategy'
import {ConfigModule, ConfigService} from '@nestjs/config'
import {PrismaService} from '../prisma/prisma.service'

@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: {expiresIn: '60m'},
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [AuthService, JwtStrategy, LocalStrategy, PrismaService],
    controllers: [AuthController],
})
export class AuthModule {
}