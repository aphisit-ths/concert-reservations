import {Body, Controller, Get, Post, Request, UseGuards} from '@nestjs/common'
import {ReservationService} from './reservation.service'
import {AuthGuard} from '@nestjs/passport'
import {RolesGuard} from '../auth/guard/role.guard'
import {HasRoles} from '../auth/decorator/roles.decorator'
import {Role} from '../enum/role.enum'
import {CreateConcertRequestDto} from '../concert/dto/create-concert-request-dto'
import {CancelReservationDTO, CreateReservationDTO} from './dto/create-reservation.dto'
import {User} from '@prisma/client'

@Controller('reservation')
export class ReservationController {
    constructor(private readonly reservationService: ReservationService) {
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @HasRoles(Role.User)
    @Post('/create')
    async create(@Body() request: CreateReservationDTO, @Request() req) {
        const newRequest: CreateReservationDTO  = {
            concertId: request.concertId,
            reservationDate: new Date(),
            userId: req.user.userId,
            user: req.user
        }
        await this.reservationService.addToReservationQueue(newRequest)
        return {message: "Concert reservation just processing"}

    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @HasRoles(Role.User)
    @Post('/cancel')
    async cancel(@Body() request: CancelReservationDTO, @Request() req) {
        const userId = req.user.userId
        return this.reservationService.cancelReservation(request.reservationId, userId)
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get('/logs')
    async logs(@Request() req) {
        return this.reservationService.getReservationsLogs(req.user)
    }
}
