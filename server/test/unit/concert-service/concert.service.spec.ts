import {Test, TestingModule} from '@nestjs/testing'
import {ConcertService} from '../../../src/concert/concert.service'
import {PrismaService} from '../../../src/prisma/prisma.service'
import {Concert, User} from '@prisma/client'
import {CreateConcertRequestDto} from '../../../src/concert/dto/create-concert-request-dto'
import {DeleteConcertDTO} from '../../../src/concert/dto/delete-concert-request-dto'
import {BadRequestException} from '@nestjs/common'
import {ReservationStatus} from '../../../src/enum/reservation-status.enum'

const prismaMock = {
    concert: {
        create: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        aggregate: jest.fn(),
    },
    user: {
        findUnique: jest.fn(),
    },
    reservation: {
        aggregate: jest.fn(),
    }
}

describe('ConcertService', () => {
    let service: ConcertService
    const mockConcert: Concert = {
        createdAt: new Date(),
        deleted: false,
        description: 'test_desc',
        id: 1,
        name: 'test_name',
        seat: 10,
        updatedAt: new Date(),
        userId: 1
    }
    const mockUser: User = {
        username: 'test_user',
        id: 1,
        isAdmin: true,
        password: 'hashed_password',
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
    }
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ConcertService,
                {
                    provide: PrismaService,
                    useValue: prismaMock
                }
            ],
        }).compile()

        service = module.get<ConcertService>(ConcertService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })


    it('should get concert by id', async () => {

        prismaMock.concert.findUnique.mockReturnValue(mockConcert)

        const response = await service.getConcertById(1)

        expect(prismaMock.concert.findUnique).toHaveBeenCalled()
        expect(response).toStrictEqual(mockConcert)

    })

    it('should return null when not founded concert', async () => {
        prismaMock.concert.findUnique.mockReturnValue(null)

        const response = await service.getConcertById(1)

        expect(prismaMock.concert.findUnique).toHaveBeenCalled()
        expect(response).toStrictEqual(null)
    })
    it('should create concert', async () => {

        const request: CreateConcertRequestDto = {
            description: 'test_desc',
            name: 'test_concert',
            seat: 12,
            userId: 1
        }

        const createdConcert: Concert = {createdAt: undefined, deleted: false, description: '', name: '', seat: 0, updatedAt: undefined, userId: 0, id: 1}

        prismaMock.user.findUnique.mockReturnValue(mockUser)

        prismaMock.concert.create.mockReturnValue(createdConcert)
        const response = await service.createConcert(request, mockUser)
        expect(response.concertId).toEqual(1)
        expect(response.message).toBeDefined()
    })

    it('should delete concert when concert already exist', async () => {

        const expected: DeleteConcertDTO = {
            message: 'concert was deleted',
            deletedConcertId: 1,
            deleted: true
        }

        prismaMock.concert.findUnique.mockReturnValue(mockConcert)
        prismaMock.concert.update.mockReturnValue({...mockConcert, deleted: true,})

        const response = await service.deleteConcert(1)

        expect(prismaMock.concert.findUnique).toHaveBeenCalled()
        expect(response).toBeDefined()
        expect(response.deletedConcertId).toEqual(mockConcert.id)
        expect(response.deleted).toEqual(true)
        expect(response).toStrictEqual(expected)

    })
    it('should throw when delete concert when concert not already exist', async () => {
        try {
            prismaMock.concert.findUnique.mockReturnValue(null)
        } catch (e) {
            expect(e).toStrictEqual(new BadRequestException('delete target not founded'))
        }
    })

    describe('getSummary', () => {
        it('should return the summary of the concert reservations', async () => {
            const confirmedCount = 10
            const canceledCount = 5
            const totalSeat = 100

            prismaMock.reservation.aggregate
                .mockResolvedValueOnce({_count: {id: confirmedCount}})
                .mockResolvedValueOnce({_count: {id: canceledCount}})
            prismaMock.concert.aggregate.mockResolvedValueOnce({_sum: {seat: totalSeat}})

            const result = await service.getSummary()

            expect(result).toEqual({
                canceled: canceledCount,
                reserved: confirmedCount,
                totalSeat: totalSeat
            })
        })

        it('should return the total seat count', async () => {
            const totalSeat = 100

            prismaMock.concert.aggregate.mockResolvedValueOnce({_sum: {seat: totalSeat}})

            const result = await service.countOfTotalSeat()

            expect(result).toBe(totalSeat)
        })

        it('should return the count of reservations by status', async () => {
            const count = 10

            prismaMock.reservation.aggregate.mockResolvedValueOnce({_count: {id: count}})

            const result = await service.countByReservationStatus(ReservationStatus.Confirmed)

            expect(result).toBe(count)
            expect(prismaMock.reservation.aggregate).toHaveBeenCalledWith({
                where: {
                    status: ReservationStatus.Confirmed,
                    concert: {
                        deleted: false
                    }
                },
                _count: {
                    id: true
                }
            })
        })

        it('should throw an error if any of the queries fail', async () => {
            prismaMock.reservation.aggregate.mockRejectedValueOnce(new Error('Query failed'))

            await expect(service.getSummary()).rejects.toThrow('Query failed')
        })
    })


})



