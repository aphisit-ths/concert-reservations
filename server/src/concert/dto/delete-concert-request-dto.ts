import {BaseConcertDTO} from './create-concert-request-dto'

export class DeleteConcertDTO  extends BaseConcertDTO{
    deletedConcertId: number
    deleted: boolean
}