import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwtConfig from "../configs/jwt.config";
import { ConfigService, ConfigType } from "@nestjs/config";

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
    constructor(
        private configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('REFRESH_JWT_SECRET'),
            ignoreExpiration: false,
        });
    }

    validate(payload: any) {
        if (!payload.sub) {
            throw new UnauthorizedException('Не верный refresh-токен');
        }

        return {
            sub: payload.sub,
            unique_name: payload.unique_name,
        };
    }
}