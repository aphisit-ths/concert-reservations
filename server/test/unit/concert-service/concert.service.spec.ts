import {Test, TestingModule} from '@nestjs/testing'
import {ConcertService} from '../../../src/concert/concert.service'
import {PrismaService} from '../../../src/prisma/prisma.service'
import {CreateConcertRequestDTO} from '../../../src/concert/dto/create-concert-request-d-t.o'
import {Concert, User} from '@prisma/client'
import {BadRequestException} from '@nestjs/common'

const prismaMock = {
    concert: {
        create: jest.fn(),
        findUnique: jest.fn(),
    },
    user:{
        findUnique: jest.fn(),
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
        const mockUser: User = {
            username: 'test_user',
            id: 1,
            isAdmin: true,
            password: 'hashed_password',
            deleted: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const request:CreateConcertRequestDTO  = {
            description: 'test_desc',
            name: 'test_concert',
            seat: 12,
            userId: 1
        }

        const createdConcert : Concert = {createdAt: undefined, deleted: false, description: '', name: '', seat: 0, updatedAt: undefined, userId: 0, id: 1}

        prismaMock.concert.create.mockReturnValue(createdConcert)
        const response = await service.createConcert(request ,mockUser)
        expect(response.concertId).toEqual(1)
        expect(response.message).toBeDefined()
    })
})



