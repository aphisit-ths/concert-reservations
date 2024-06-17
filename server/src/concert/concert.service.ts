import {BadRequestException, Injectable} from '@nestjs/common'
import {IConcertService} from './concert.service.interface'
import {Concert, User} from '@prisma/client'
import {PrismaService} from '../prisma/prisma.service'
import {CreateConcertRequestDto, CreateConcertResponseDTO} from './dto/create-concert-request-dto'
import {DeleteConcertDTO} from './dto/delete-concert-request-dto'
import {GetConcertSummaryDTO} from './dto/get-concert-summary.dto'
import {ReservationStatus} from '../enum/reservation-status.enum'

@Injectable()
export class ConcertService implements IConcertService {
    constructor(private prisma: PrismaService) {
    }

    async getConcert(): Promise<Concert[]> {
        try {
            return await this.prisma.concert.findMany({
                orderBy: {
                    createdAt: 'asc'
                },
                where: {
                    deleted: false
                },
                include:{
                    reservation: true
                }
            })
        } catch (e) {
            console.log(e)
            throw e
        }
    }

    async getConcertById(id: number): Promise<Concert> {
        try {
            return await this.prisma.concert.findUnique({
                where: {
                    id: id,
                    deleted: false
                },
            })
        } catch (e) {
            console.log(e)
            throw e
        }
    }

    async createConcert(request: CreateConcertRequestDto, user: User): Promise<CreateConcertResponseDTO> {
        try {
            this.validateCreateConcertRequest(request)
            const admin = await this.prisma.user.findUnique({
                where: {
                    id: user.id,
                    username: user.username
                }
            })

            this.adminChecker(admin)

            const createdConcert = await this.prisma.concert.create({
                data: {
                    createdAt: new Date(),
                    deleted: false,
                    description: request.description.trim().toLowerCase(),
                    name: request.description.trim().toLowerCase(),
                    seat: request.seat,
                    updatedAt: new Date(),
                    userId: admin.id
                }
            })
            return {message: 'Created success', concertId: createdConcert.id}
        } catch (e) {
            console.log(e)
            throw e
        }
    }

    validateCreateConcertRequest(request: CreateConcertRequestDto) {
        if (!request.name) {
            throw new BadRequestException('name is require')
        }
        if (!request.description) {
            throw new BadRequestException('description is require')
        }
        if (!request.seat) {
            throw new BadRequestException('seat is require')
        } else {
            if (request.seat <= 0) {
                throw new BadRequestException('seat must greater than 0')
            }
            if (request.seat > 10 * 1000000) {
                throw new BadRequestException('seat must relate real word')
            }
        }
    }

    adminChecker(user?: User) {
        if (!user?.isAdmin) {
            throw new BadRequestException('Authorization require')
        }
    }

    async deleteConcert(id: number): Promise<DeleteConcertDTO> {
        try {
            const concert = await this.prisma.concert.findUnique({
                where: {id: id, deleted: false}
            })
            if (!concert) {
                throw new BadRequestException('delete target not founded')
            }
            const updatedConcert = await this.prisma.concert.update({
                where: {
                    id: concert.id
                }, data: {
                    deleted: true
                }
            })
            return {
                deletedConcertId: updatedConcert.id,
                message: 'concert was deleted',
                deleted: updatedConcert.deleted
            }
        } catch (e) {
            console.log(e)
            throw e
        }
    }

    async getSummary(): Promise<GetConcertSummaryDTO> {
        try {
            const countOfConfirmed = await this.countByReservationStatus(ReservationStatus.Confirmed)
            const countOfCanceled = await this.countByReservationStatus(ReservationStatus.Canceled)
            const totalSeat = await this.countOfTotalSeat()

            return {
                canceled: countOfCanceled, reserved: countOfConfirmed, totalSeat: totalSeat
            }
        } catch (e) {
            console.log(e)
            throw e
        }
    }

    async countOfTotalSeat() {
        const totalSeat = await this.prisma.concert.aggregate({
            where: {
                deleted: false
            },
            _sum: {
                seat: true
            }
        })
        return totalSeat._sum.seat
    }

    async countByReservationStatus(status: ReservationStatus): Promise<number> {
        console.log(status)
        const reservations = await this.prisma.reservation.aggregate({
            where: {
                status: status,
                concert: {
                    deleted: false
                }
            },
            _count: {
                id : true
            }
        })
        return reservations._count.id
    }
}
