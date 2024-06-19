import {Test, TestingModule} from '@nestjs/testing'
import {ReservationService} from '../../../src/reservation/reservation.service'
import {PrismaService} from '../../../src/prisma/prisma.service'
import {ReservationStatus} from '../../../src/enum/reservation-status.enum'
import {BadRequestException} from '@nestjs/common'
import {CreateReservationDTO} from '../../../src/reservation/dto/create-reservation.dto'


const prismaMock = {
    reservation: {
        create: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        findFirst: jest.fn()
    },
    reservationLog: {
        create: jest.fn(),
    },
    $transaction: jest.fn((fn) => fn(prismaMock)),
};

describe('ReservationService', () => {
    let service: ReservationService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ReservationService, {
                provide: PrismaService,
                useValue: prismaMock
            }],
        }).compile()

        service = module.get<ReservationService>(ReservationService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })

    describe('createReservation', () => {
        it('should update reservation to PENDING if not available and then RESERVED', async () => {
            const dto: CreateReservationDTO & {reservationId: number} = {
                concertId: 0,
                reservationDate: new Date,
                reservationId: 1, userId: 1 ,
                user: {
                    username: 'test',
                    id: 0,
                    password: '',
                    isAdmin: false,
                    createdAt: undefined,
                    updatedAt: undefined,
                    deleted: false
                }};
            service.checkConcertIsAvailable = jest.fn().mockResolvedValue(false);

            prismaMock.reservation.update
                .mockResolvedValueOnce({
                    id: 1,
                    status: ReservationStatus.WAITLISTED,
                })


            prismaMock.reservationLog.create
                .mockResolvedValueOnce({
                    reservationId: 1,
                    action: ReservationStatus.WAITLISTED,
                    userId: 1,
                })

            const result = await service.createReservation(dto);

            expect(prismaMock.reservation.update).toHaveBeenCalledTimes(1);
            expect(prismaMock.reservationLog.create).toHaveBeenCalledTimes(1);
            expect(result).toEqual({
                id: 1,
                status: ReservationStatus.WAITLISTED,
            });
        });
    });

    it('should add a reservation to the queue and call createReservation', async () => {
        const dto = { userId: 1, concertId: 1, reservationDate: new Date() ,};
        const reservation = { id: 1, ...dto, status: ReservationStatus.PENDING };

        prismaMock.reservation.create.mockResolvedValueOnce(reservation);
        prismaMock.reservation.findFirst.mockResolvedValueOnce(null);
        service.createReservation = jest.fn().mockResolvedValue(reservation);

        await service.addToReservationQueue(dto);

        expect(prismaMock.reservation.create).toHaveBeenCalled();
    });

    it('throws BadRequestException when reservation is not found', async () => {
        prismaMock.reservation.findUnique.mockResolvedValueOnce(null)

        await expect(service.cancelReservation(1, 1)).rejects.toThrow(
            BadRequestException
        )
        expect(prismaMock.reservation.findUnique).toHaveBeenCalledWith({where: {id: 1}})
    })

    it('throws BadRequestException when reservation is not in RESERVED state', async () => {
        const reservation = {id: 1, status: ReservationStatus.PENDING}
        prismaMock.reservation.findUnique.mockResolvedValueOnce(reservation)

        await expect(service.cancelReservation(1, 1)).rejects.toThrow(
            BadRequestException
        )
        expect(prismaMock.reservation.findUnique).toHaveBeenCalledWith({where: {id: 1}})
    })

    it('cancels reservation successfully', async () => {
        const reservation = {
            id: 1,
            status: ReservationStatus.RESERVED,
            userId: 1
        }
        prismaMock.reservation.findUnique.mockResolvedValueOnce(reservation)
        prismaMock.reservation.update.mockResolvedValueOnce({
            ...reservation,
            status: ReservationStatus.CANCELLED,
        })
        prismaMock.reservationLog.create.mockResolvedValueOnce({
            reservationId: 1,
            action: ReservationStatus.CANCELLED,
            userId: 1,
        })

        const result = await service.cancelReservation(1, 1)

        expect(result).toEqual({...reservation, status: ReservationStatus.CANCELLED})
        expect(prismaMock.reservation.findUnique).toHaveBeenCalledWith({
            where: {id: 1},
        })
        expect(prismaMock.$transaction).toHaveBeenCalled()
        expect(prismaMock.reservation.update).toHaveBeenCalledWith({
            where: {id: 1},
            data: {status: ReservationStatus.CANCELLED},
        })
        expect(prismaMock.reservationLog.create).toHaveBeenCalledWith({
            data: {
                reservationId: 1,
                action: ReservationStatus.CANCELLED,
                userId: 1,
            },
        })
    })
})

