import {Test, TestingModule} from '@nestjs/testing'
import {ReservationService} from '../../../src/reservation/reservation.service'
import {PrismaService} from '../../../src/prisma/prisma.service'
import {BadRequestException} from '@nestjs/common'
import {ReservationStatus} from '../../../src/enum/reservation-status.enum'

const prismaMock = {
    concert: {
        create: jest.fn(),
        findUnique: jest.fn(),
    },
    user: {
        findUnique: jest.fn(),
    }
}

describe('ReservationValidationService', () => {
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

    it('throws BadRequestException when concert is not found', async () => {
        prismaMock.concert.findUnique.mockResolvedValueOnce(null)

        await expect(service.checkConcertIsAvailable(1)).rejects.toThrow(BadRequestException)
        expect(prismaMock.concert.findUnique).toHaveBeenCalledWith({
            where: {id: 1},
            include: {reservation: true},
        })
    })

    it('return false if concert is full (5)', async () => {
        const concert = {
            id: 1,
            seat: 5,
            reservation: [
                {status: ReservationStatus.RESERVED},
                {status: ReservationStatus.RESERVED},
                {status: ReservationStatus.RESERVED},
                {status: ReservationStatus.RESERVED},
                {status: ReservationStatus.RESERVED},
            ],
        }
        prismaMock.concert.findUnique.mockResolvedValueOnce(concert)

        const isAvailable = await service.checkConcertIsAvailable(1)

        expect(isAvailable).toEqual(false)
        expect(prismaMock.concert.findUnique).toHaveBeenCalledWith({
            where: {id: 1},
            include: {reservation: true},
        })
    })

    it('resolves successfully when concert has available seats', async () => {
        const concert = {
            id: 1,
            seat: 5,
            reservation: [{status: ReservationStatus.RESERVED}],
        }
        prismaMock.concert.findUnique.mockResolvedValueOnce(concert)
        const isAvailable = service.checkConcertIsAvailable(1)
        await expect(isAvailable).resolves.toEqual(true)
        expect(prismaMock.concert.findUnique).toHaveBeenCalledWith({
            where: {id: 1},
            include: {reservation: true},
        })
    })
})
