import {Test, TestingModule} from '@nestjs/testing'
import {ConcertService} from '../../../src/concert/concert.service'
import {PrismaService} from '../../../src/prisma/prisma.service'
import {CreateConcertRequestDto} from '../../../src/concert/dto/create-concert-request-dto'
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

    it('should throw error if name is missing', () => {
        const request: CreateConcertRequestDto = {
            name: null,
            description: 'Testing concert creation',
            seat: 100
        };

        expect(() => service.validateCreateConcertRequest(request)).toThrow(BadRequestException);
        expect(() => service.validateCreateConcertRequest(request)).toThrow('name is require');
    });

    it('should throw error if description is missing', () => {
        const request: CreateConcertRequestDto = {
            name: 'Test Concert',
            seat: 100,
            description : null
        };

        expect(() => service.validateCreateConcertRequest(request)).toThrow(BadRequestException);
        expect(() => service.validateCreateConcertRequest(request)).toThrow('description is require');
    });

    it('should throw error if seat is missing', () => {
        const request: CreateConcertRequestDto = {
            seat: 0,
            name: 'Test Concert',
            description: 'Testing concert creation'
        };

        expect(() => service.validateCreateConcertRequest(request)).toThrow(BadRequestException);
        expect(() => service.validateCreateConcertRequest(request)).toThrow('seat is require');
    });

    it('should throw error if seat is zero or negative', () => {
        const request: CreateConcertRequestDto = {
            name: 'Test Concert',
            description: 'Testing concert creation',
            seat: -24
        };

        expect(() => service.validateCreateConcertRequest(request)).toThrow(BadRequestException);
        expect(() => service.validateCreateConcertRequest(request)).toThrow('seat must greater than 0');
    });

    it('should throw error if seat is greater than 10 million', () => {
        const request: CreateConcertRequestDto = {
            name: 'Test Concert',
            description: 'Testing concert creation',
            seat: 20000000
        };

        expect(() => service.validateCreateConcertRequest(request)).toThrow(BadRequestException);
        expect(() => service.validateCreateConcertRequest(request)).toThrow('seat must less than 100000');
    });

    it('should not throw error if request is valid', () => {
        const request: CreateConcertRequestDto = {
            name: 'Test Concert',
            description: 'Testing concert creation',
            seat: 100
        };

        expect(() => service.validateCreateConcertRequest(request)).not.toThrow();
    });
})