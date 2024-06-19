import {BadRequestException, Injectable, Logger} from '@nestjs/common'
import {PrismaService} from '../prisma/prisma.service'
import {ReservationStatus} from '../enum/reservation-status.enum'
import {CreateReservationDTO} from './dto/create-reservation.dto'

@Injectable()
export class ReservationService {
    private readonly logger = new Logger(ReservationService.name)

    constructor(private readonly prisma: PrismaService) {
    }

    public async checkConcertIsAvailable(concertId: number): Promise<boolean> {
        const concert = await this.prisma.concert.findUnique({
            where: {id: concertId},
            include: {reservation: true},
        })


        if (!concert) {
            throw new BadRequestException('Concert not found')
        }

        const reservedCount = concert.reservation.filter(
            (reservation) => reservation.status === ReservationStatus.RESERVED
        ).length
        return reservedCount < concert.seat
    }

    async addToReservationQueue(dto: CreateReservationDTO) {
        try {
            const existingReservation = await this.prisma.reservation.findFirst({
                where: {
                    userId: dto.userId,
                    concertId: dto.concertId,
                    status: {
                        in: [ReservationStatus.RESERVED, ReservationStatus.RESERVED],
                    },
                },
            });

            if (existingReservation) {
                throw new BadRequestException('User already has a reservation with this concert ID and status "reserved" or "cancelled".');
            }
            const reservation = await this.prisma.reservation.create({
                data: {
                    concert:{connect:{id : dto.concertId}},
                    reservationDate: dto.reservationDate,
                    status: ReservationStatus.PENDING,
                    user:{connect:{id: dto.userId}},
                },
            })

            this.logger.debug('Add to queue ============>')
            await this.createReservation({...dto, reservationId: reservation.id})
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    async createReservation(dto: CreateReservationDTO & { reservationId: number }) {
        try {
            const available = await this.checkConcertIsAvailable(dto.concertId)
            if (!available) {
               const reservation=  await this.prisma.reservation.update({
                    where: {
                        id: dto.reservationId
                    },
                    data: {
                        status: ReservationStatus.WAITLISTED
                    }
                })

                await this.prisma.reservationLog.create({
                    data: {
                        reservation: {connect: {id : dto.reservationId }},
                        user: {connect:{id: dto.userId ,username: dto.user.username}},
                        action: ReservationStatus.WAITLISTED,
                    },
                })

                return reservation
            }

            const reservation = await this.prisma.reservation.update({
                where: {id: dto.reservationId},
                data: {
                    status: ReservationStatus.RESERVED,
                },
            })

            await this.prisma.reservationLog.create({
                data: {
                    reservation: {connect: {id : dto.reservationId}},
                    user: {connect:{id: dto.userId, username: dto.user.username}},
                    action: ReservationStatus.RESERVED,
                },
            })
            return reservation

        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    async cancelReservation(id: number, userId: number) {
        try {
            const reservation = await this.prisma.reservation.findUnique({
                where: {id},
            })

            if (!reservation) {
                throw new BadRequestException('Reservation not found')
            }
            if (reservation.userId !== userId) {
                throw new BadRequestException('You can only cancel your own reservations');
            }

            if (reservation.status !== ReservationStatus.RESERVED) {
                throw new BadRequestException('Only reservations with \'RESERVED\' status can be cancelled')
            }

            const [updatedReservation, updatedReservationLog] = await this.prisma.$transaction(async (prismaTx) => {
                const updatedReservation = await prismaTx.reservation.update({
                    where: {id},
                    data: {status: ReservationStatus.CANCELLED},
                })

                const updatedReservationLog = await prismaTx.reservationLog.create({
                    data: {
                        reservationId: reservation.id,
                        action: ReservationStatus.CANCELLED,
                        userId,
                    },
                })

                return [updatedReservation, updatedReservationLog]
            })
            return updatedReservation
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    async getReservationsLogs(userId: number): Promise<{id:number, datetime: Date, username: string, concertName: string, action: string }[]> {
        const logs = await this.prisma.reservationLog.findMany({
            where:{
                reservation:{
                    concert:{
                        deleted: false
                    }
                }
            },
            select: {
                id: true,
                actionDate: true,
                action: true,
                user: {
                    select: {
                        username: true,
                    },
                },
                reservation: {
                    select: {
                        concert: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                actionDate: 'desc',
            },
        });

        return logs.map(log => ({
            id: log.id,
            datetime: log.actionDate,
            username: log.user.username,
            concertName: log.reservation.concert.name,
            action: log.action,
        }));
    }
}
