import {BadRequestException, Injectable} from '@nestjs/common'
import {IConcertService} from './concert.service.interface'
import {Concert, Prisma, User} from '@prisma/client'
import {PrismaService} from '../prisma/prisma.service'
import {CreateConcertRequestDTO, CreateConcertResponseDTO} from './dto/create-concert-request-d-t.o'
import {request} from 'express'
import {use} from 'passport'

@Injectable()
export class ConcertService implements IConcertService {
    constructor(private prisma: PrismaService) {
    }

    async getConcert(): Promise<Concert[]> {
        try {
            return await this.prisma.concert.findMany({
                orderBy: {
                    createdAt: 'asc'
                }
            })
        } catch (e) {
            throw e
        }
    }

    async getConcertById(id: number): Promise<Concert> {
        try {
            return await this.prisma.concert.findUnique({
                where: {
                    id: id
                },
                include: {
                    user: true
                }
            })
        } catch (e) {
            throw e
        }
    }

    async createConcert(request: CreateConcertRequestDTO, user: User): Promise<CreateConcertResponseDTO> {

        this.validateCreateConcertRequest(request)
        const admin = await this.prisma.user.findUnique({where:{
                id: user.id,
                username: user.username
        }})
        this.adminChecker(admin)

        const createdConcert = await this.prisma.concert.create({data: {
                createdAt: new Date(),
                deleted: false,
                description: request.description.trim().toLowerCase(),
                name: request.description.trim().toLowerCase(),
                seat: request.seat,
                updatedAt: new Date(),
                userId : admin.id
            }})
        return {message: 'Created success', concertId: createdConcert.id}
    }

    validateCreateConcertRequest(request: CreateConcertRequestDTO) {
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
}
