import {IsNotEmpty} from 'class-validator'
import {User} from '@prisma/client'

export class CreateReservationDTO {
    userId : number
    @IsNotEmpty()
    concertId: number
    reservationDate: Date
    user?: User
}

export class CancelReservationDTO {
    @IsNotEmpty()
    reservationId: number
}