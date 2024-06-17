import {Concert, User} from '@prisma/client'
import {CreateConcertRequestDTO, CreateConcertResponseDTO} from './dto/create-concert-request-d-t.o'

export interface IConcertService {
    createConcert(concert :CreateConcertRequestDTO, user:User): Promise<CreateConcertResponseDTO>
    getConcertById(id: number): Promise<Concert>
    getConcert(): Promise<Concert[]>
}
