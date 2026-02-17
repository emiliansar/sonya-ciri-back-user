import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, SigninUserDto } from './dto/user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    async signup(dto: CreateUserDto) {
        if (!dto.first_name ||
            !dto.last_name ||
            !dto.unique_name
        ) {
            throw new UnauthorizedException("Отсутствует имя, фамилия или уникальное имя");
        }

        const unique_name = await this.prisma.user.findUnique({
            where: {
                unique_name: dto.unique_name
            }
        });

        if (unique_name) {
            throw new UnauthorizedException("Это уникальное имя уже занято");
        }

        // return await this.prisma.user.create({
        //     data: {
        //         ...dto
        //     }
        // });

        const user = await this.prisma.user.create({
            data: {
                ...dto
            }
        });

        return this.signin(user)
    }

    async signin(dto: SigninUserDto): Promise<{
        id: number,
        unique_name?: string,
        access_token: string,
        refresh_token: string,
    }> {
        if (!dto.first_name ||
            !dto.last_name ||
            !dto.unique_name
        ) {
            throw new UnauthorizedException("Отсутствует имя, фамилия или уникальное имя");
        }

        const user = await this.prisma.user.findUnique({
            where: {
                unique_name: dto.unique_name
            }
        });

        if (!user) {
            throw new UnauthorizedException("Пользователя с таким уникальным именем не существует");
        }

        const payload = { sub: user.id, unique_name: user.unique_name };

        const access_token = await this.jwtService.signAsync(payload, {
            expiresIn: this.configService.get('JWT_EXPIRE_IN', '1h'),
        });

        const refresh_token = await this.jwtService.signAsync(payload, {
            secret: this.configService.get('REFRESH_JWT_SECRET'),
            expiresIn: this.configService.get('REFRESH_JWT_EXPIRE_IN', '1d'),
        });

        return {
            ...user,
            id: +user.id,
            unique_name: user.unique_name,
            access_token,
            refresh_token,
        }
    }

    async refreshToken(userId: number) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            throw new UnauthorizedException('Не верный токен')
        }

        const newAccessToken = await this.jwtService.signAsync(
            { sub: user.id, unique_name: user.unique_name },
            { expiresIn: this.configService.get('JWT_EXPIRE_IN', '1h') }
        );

        return {
            ...user,
            id: user.id,
            access_token: newAccessToken,
            unique_name: user.unique_name,
        };
    }
}

