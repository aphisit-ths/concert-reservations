export interface GetConcertResponse {
    id: number
    seat: number,
    name: string,
    description: string,
    createdAt: Date,
    updatedAt: Date,
    deleted: boolean,
    userId: number,
    "reservation": [],
    "availableStatus": boolean,
    "availableSeat": string
}