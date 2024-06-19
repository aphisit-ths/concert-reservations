import {Concert, User} from '@prisma/client'
import {DeleteConcertDTO} from './dto/delete-concert-request-dto'
import {CreateConcertRequestDto, CreateConcertResponseDTO} from './dto/create-concert-request-dto'
import {GetConcertSummaryDTO} from './dto/get-concert-summary.dto'

export interface IConcertService {
    createConcert(concert :CreateConcertRequestDto, user:User): Promise<CreateConcertResponseDTO>
    getConcertById(id: number): Promise<Concert>
    getConcert(): Promise<Concert[]>
    deleteConcert(id: number): Promise<DeleteConcertDTO>
    getSummary(): Promise<GetConcertSummaryDTO>
}
