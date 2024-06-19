import {IsNotEmpty} from 'class-validator'

export class CreateConcertRequestDto {
    @IsNotEmpty()
    description: string
    @IsNotEmpty()
    name: string
    @IsNotEmpty()
    seat: number
}
export class BaseConcertDTO {
    message: string
}

export class CreateConcertResponseDTO  extends BaseConcertDTO{
    concertId: number
}
