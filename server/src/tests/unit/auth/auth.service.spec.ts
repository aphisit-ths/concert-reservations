import {Test, TestingModule} from '@nestjs/testing';
import {AuthService} from '../../../auth/auth.service';
import {CreateAccountDto} from "../../../auth/dto/create-account.dto";
import {PrismaService} from "../../../prisma/prisma.service";
import {User} from "@prisma/client";
import {BadRequestException} from "@nestjs/common";

const prismaMock = {
    user: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
    },
};
describe('AuthService', () => {
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService, {
                provide: PrismaService,
                useValue: prismaMock
            }],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create account', () => {
        const input: CreateAccountDto = {
            username: "user01",
            password: "1234567890",
            admin: true
        }

        const expectedUser: User = {
            id: 1,
            username: "user01",
            password: "hashed",
            isAdmin: true,
            createdAt: new Date(),
            deletedAt: undefined,
            updatedAt: new Date(),
        }

        it('should create account', async () => {
            prismaMock.user.create.mockResolvedValue(expectedUser);
            const result = await service.createAccount(input)
            expect(prismaMock.user.findUnique).toBeCalledTimes(1);
            expect(prismaMock.user.create).toBeCalledTimes(1);
            expect(result.username).toEqual(input.username);
            expect(result.isAdmin).toEqual(input.admin);
        })

        it('should throw when user already existing', async () => {
            prismaMock.user.findUnique.mockResolvedValue(expectedUser);
            await expect(service.createAccount(input)).rejects.toThrowError(BadRequestException)
        });
    })
});
