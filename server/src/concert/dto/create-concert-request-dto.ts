export class CreateConcertRequestDto {
    description: string
    name: string
    seat: number
    userId: number
}
export class BaseConcertDTO {
    message: string
}

export class CreateConcertResponseDTO  extends BaseConcertDTO{
    concertId: number
}
