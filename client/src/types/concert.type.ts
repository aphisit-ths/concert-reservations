import {ReservationStatus} from '@/types/reservation-status.enum'

export interface GetConcertResponse {
    id: number
    seat: number,
    name: string,
    description: string,
    createdAt: Date,
    updatedAt: Date,
    deleted: boolean,
    userId: number,
    reservation: [],
    availableStatus: boolean,
    countReserved: string
}

export interface ConcertEvent {
    id: number;
    datetime: Date;
    username: string;
    concertName: string;
    action: ReservationStatus;
}