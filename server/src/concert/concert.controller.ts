import {Body, Controller, Delete, Get, Param, Post, Request, UseGuards} from '@nestjs/common'
import {AuthGuard} from '@nestjs/passport'
import {ConcertService} from './concert.service'
import {CreateConcertRequestDto} from './dto/create-concert-request-dto'
import {RolesGuard} from '../auth/guard/role.guard'
import {HasRoles} from '../auth/decorator/roles.decorator'
import {Role} from '../enum/role.enum'

@Controller('concert')
export class ConcertController {
    constructor(private readonly concertService: ConcertService){
    }

    @Get("/")
    async get() {
        return this.concertService.getConcert()
    }

    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @HasRoles(Role.Admin)
    @Get("/summary")
    async getSummary() {
        return this.concertService.getSummary()
    }

    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @HasRoles(Role.Admin)
    @Post("/create")
    async create(@Body() request : CreateConcertRequestDto, @Request() req) {
        return this.concertService.createConcert(request ,req.user)
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @HasRoles(Role.Admin)
    @Delete("/:id/delete-concert")
    async delete(@Param() params) {
        const { id} = params
        return this.concertService.deleteConcert(+id)
    }
}
