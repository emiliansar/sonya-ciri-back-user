import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PatchUserDto } from './dto/user.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly authService: AuthService
    ) {}

    async getUser(userId: number) {
        return this.prismaService.user.findUnique({
            where: {
                id: userId
            }
        });
    }

    async patchUser(dto: PatchUserDto) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: dto.id
            }
        });

        if (!user) {
            throw new BadRequestException("Пользователь не найден")
        }

        const updatedUser = await this.prismaService.user.update({
            where: {
                id: dto.id
            },
            data: {
                unique_name: dto.unique_name,
                first_name: dto.first_name,
                last_name: dto.last_name
            }
        });

        return await this.authService.refreshToken(updatedUser.id)
    }

    async deleteUser(userId: number) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            throw new BadRequestException("Пользователь не найден")
        }

        return this.prismaService.user.delete({
            where: {
                id: userId
            }
        });
    }
}

