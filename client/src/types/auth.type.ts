import {ReservationStatus} from '@/types/reservation-status.enum'


export interface LoginRequest {
    username: string
    password: string
}

export interface User {
    id: number;
    username: string;
    password: string;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
    reservation: Reservation[];
}

export interface Reservation {
    id: number;
    userId: number;
    concertId: number;
    reservationDate: string;
    status: ReservationStatus
}
