import {Module} from '@nestjs/common'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {PrismaService} from './prisma/prisma.service'
import {AuthModule} from './auth/auth.module'
import {ConfigModule} from '@nestjs/config'
import {ConcertService} from './concert/concert.service'
import {ConcertModule} from './concert/concert.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        AuthModule,
        ConcertModule
    ],
    controllers: [AppController],
    providers: [AppService, PrismaService, ConcertService],
})
export class AppModule {
}
