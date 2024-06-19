import {Module} from '@nestjs/common'
import {PrismaService} from '../prisma/prisma.service'
import {ConcertController} from './concert.controller'
import {JwtStrategy} from '../auth/strategies/jwt.strategy'
import {ConcertService} from './concert.service'

@Module({
    providers: [PrismaService, ConcertService ,JwtStrategy],
    controllers: [ConcertController],
})
export class ConcertModule {
}