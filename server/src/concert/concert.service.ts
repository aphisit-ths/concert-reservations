import {BadRequestException, Injectable, Logger} from '@nestjs/common'
import {IConcertService} from './concert.service.interface'
import {Concert, User} from '@prisma/client'
import {PrismaService} from '../prisma/prisma.service'
import {CreateConcertRequestDto, CreateConcertResponseDTO} from './dto/create-concert-request-dto'
import {DeleteConcertDTO} from './dto/delete-concert-request-dto'
import {GetConcertDTO, GetConcertSummaryDTO} from './dto/get-concert-summary.dto'
import {ReservationStatus} from '../enum/reservation-status.enum'

@Injectable()
export class ConcertService implements IConcertService {
    private readonly logger = new Logger(ConcertService.name);
    constructor(private prisma: PrismaService) {
    }

    async getConcert(): Promise<GetConcertDTO[]> {
        try {
            const concerts =  await this.prisma.concert.findMany({
                orderBy: {
                    createdAt: 'desc'
                },
                where: {
                    deleted: false
                },
                include:{
                    reservation: true
                }
            })
            return concerts.map(concert => {
                return {
                    ...concert,
                    availableStatus: concert
                        .reservation
                        .filter(ele => ele.status === ReservationStatus.RESERVED)
                        .length < concert.seat,
                    countReserved: concert
                        .reservation
                        .filter(ele => ele.status === ReservationStatus.RESERVED)
                        .length
                }
            })
        } catch (e) {
            this.logger.error(e)
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
            this.logger.error(e)
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
                    name: request.name.trim().toLowerCase(),
                    seat: request.seat,
                    updatedAt: new Date(),
                    userId: admin.id
                }
            })
            return {message: 'Created success', concertId: createdConcert.id}
        } catch (e) {
            this.logger.error(e)
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
            if (request.seat > 100000) {
                throw new BadRequestException('seat must less than 100000')
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
                throw new BadRequestException('delete-concert target not founded')
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
            this.logger.error(e)
            throw e
        }
    }

    async getSummary(): Promise<GetConcertSummaryDTO> {
        try {
            const countOfConfirmed = await this.countByReservationStatus(ReservationStatus.RESERVED)
            const countOfCanceled = await this.countByReservationStatus(ReservationStatus.CANCELLED)
            const totalSeat = await this.countOfTotalSeat()

            return {
                canceled: countOfCanceled, reserved: countOfConfirmed, totalSeat: totalSeat
            }
        } catch (e) {
            this.logger.error(e)
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
