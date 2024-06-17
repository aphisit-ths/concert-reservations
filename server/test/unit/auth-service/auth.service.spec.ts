import {Test, TestingModule} from '@nestjs/testing'
import {AuthService} from '../../../src/auth/auth.service'
import {PrismaService} from '../../../src/prisma/prisma.service'
import {JwtService} from '@nestjs/jwt'
import {User} from '@prisma/client'
import {CreateAccountDto} from '../../../src/auth/dto/create-account.dto'
import {BadRequestException} from '@nestjs/common'
import * as bcrypt from 'bcrypt'

const prismaMock = {
    user: {
        create: jest.fn(),
        findUnique: jest.fn(),
    },
}
describe('AuthService', () => {
    let service: AuthService
    let jwtService: JwtService

    const mockUser: User = {
        username: 'test_user',
        id: 1,
        isAdmin: false,
        password: 'hashed_password',
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {provide: PrismaService, useValue: prismaMock},
                {provide: JwtService, useValue: {sign: jest.fn()}},
            ],
        }).compile()

        service = module.get<AuthService>(AuthService)
        jwtService = module.get<JwtService>(JwtService)
    })

    it('should login a user and return access token', async () => {

        const expectedPayload = {
            username: mockUser.username.trim().toLowerCase(),
            sub: mockUser.id,
            admin: mockUser.isAdmin,
        }
        const mockToken = 'mocked_access_token'

        jest.spyOn(jwtService, 'sign').mockReturnValue(mockToken)
        const response = await service.login(mockUser)

        expect(response).toBeDefined()
        expect(response.accessKey).toEqual(mockToken)
        expect(jwtService.sign).toHaveBeenCalledWith(expectedPayload)
    })
    it('should create account', async () => {
        const request: CreateAccountDto = {admin: mockUser.isAdmin, password: '12345678', username: 'TeSt_UsEr'}

        prismaMock.user.findUnique.mockReturnValue(null)
        prismaMock.user.create.mockReturnValue(mockUser)
        const response = await service.createAccount(request)

        expect(response).toBeDefined()
        expect(request.username.trim().toLowerCase()).toEqual(response.username)
        expect(request.password !== response.password).toBeTruthy()
        expect(request.admin).toEqual(response.isAdmin)
    })
    it('should throw validate when has already existing user', async () => {
        const request: CreateAccountDto = {admin: mockUser.isAdmin, password: '12345678', username: 'TeSt_UsEr'}

        prismaMock.user.findUnique.mockReturnValue(mockUser)
        try {
            await service.createAccount(request)
        } catch (e) {
            expect(e).toStrictEqual(new BadRequestException('this username is already existing !'))
        }
    })
    it('should throw validate when password less than 8', async () => {
        const passwords = ['1234', '123456', '1234567', '12345678']
        for (const passwordsKey in passwords) {
            const request: CreateAccountDto = {admin: mockUser.isAdmin, password: passwordsKey, username: 'TeSt_UsEr'}
            prismaMock.user.findUnique.mockReturnValue(mockUser)
            try {
                await service.createAccount(request)
            } catch (e) {
                expect(e).toStrictEqual(new BadRequestException('password length must greater than 8'))
            }
        }
    })
    it('should return user when validate is valid', async () => {
        const expectedUser: User = {
            username: 'test_user',
            id: 1,
            isAdmin: false,
            password: await bcrypt.hash('123456789', 10),
            deleted: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        const request: CreateAccountDto = {admin: expectedUser.isAdmin, password: '12345678', username: 'TeSt_UsEr'}
        prismaMock.user.findUnique.mockReturnValue(expectedUser)

        jest.spyOn(bcrypt, 'compare').mockReturnValue(true)
        const response = await service.validateUser(request.username, request.password)

        expect(response).toBeDefined()
        expect(response.username.trim().toLowerCase()).toEqual(expectedUser.username)
        expect(request.admin).toEqual(expectedUser.isAdmin)
    })

    it('should return null when validateUser is invalid (user not found)', async () => {
        const request: CreateAccountDto = {admin: mockUser.isAdmin, password: '12345678', username: 'TeSt_UsEr'}

        prismaMock.user.findUnique.mockReturnValue(null)
        jest.spyOn(bcrypt, 'compare').mockReturnValue(true)

        const invalidResponse = await service.validateUser(request.username, request.password)

        expect(invalidResponse).toBeDefined()
        expect(invalidResponse).toEqual(null)
    })

    it('should return null when validateUser is invalid (not matched password) ', async () => {
        const request: CreateAccountDto = {admin: mockUser.isAdmin, password: '12345678', username: 'TeSt_UsEr'}

        prismaMock.user.findUnique.mockReturnValue(mockUser)
        jest.spyOn(bcrypt, 'compare').mockReturnValue(false)

        const invalidResponse = await service.validateUser(request.username, request.password)

        expect(invalidResponse).toBeDefined()
        expect(invalidResponse).toEqual(null)
    })

    it('should return valid value if get me valid', async () => {
        const expected: Me = {username: mockUser.username, isAdmin: mockUser.isAdmin}
        prismaMock.user.findUnique.mockReturnValue(expected)
        const response = await service.getMe(mockUser)
        expect(response).toStrictEqual(expected)
    })
    it('should return valid value if get me invalid (user not found)', async () => {
        const expected: Me = {username: mockUser.username, isAdmin: mockUser.isAdmin}
        prismaMock.user.findUnique.mockReturnValue(null)
        const response = await service.getMe(mockUser)
        expect(response).toEqual(null)
    })
})
