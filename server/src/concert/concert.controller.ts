import {Body, Controller, Get, Post, Request, UseGuards} from '@nestjs/common'
import {AuthGuard} from '@nestjs/passport'
import {ConcertService} from './concert.service'
import {CreateConcertRequestDTO} from './dto/create-concert-request-d-t.o'
import {AuthService} from '../auth/auth.service'

@Controller('concert')
export class ConcertController {
    constructor(private readonly concertService: ConcertService) {
    }

    @UseGuards(AuthGuard('jwt'))
    @Post("/")
    async create(@Body() request : CreateConcertRequestDTO, @Request() req) {
        console.log(req.user)
        return this.concertService.createConcert(request ,req.user)
    }
    @Get("/")
    async get() {
        return this.concertService.getConcert()
    }
}
