import {Prisma} from '@prisma/client'

export class CreateConcertRequestDTO  {
    description: string
    name: string
    seat: number
    userId: number
}

export class CreateConcertResponseDTO {
    message: string
    concertId: number
}