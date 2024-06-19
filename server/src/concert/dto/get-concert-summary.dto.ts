import {Concert} from '@prisma/client'

export class GetConcertSummaryDTO {
    totalSeat : number
    reserved: number
    canceled: number
}
export interface GetConcertDTO extends Concert {
    availableStatus: boolean,
    availableSeat: number
}