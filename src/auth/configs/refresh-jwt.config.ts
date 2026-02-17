import { registerAs } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";
import { StringValue } from "ms";

export default registerAs(
    'refresh-jwt',
    (): JwtModuleOptions => ({
        secret: process.env.REFRESH_JWT_SECRET!,
        signOptions: {
            expiresIn: (process.env.REFRESH_JWT_EXPIRE_IN ?? '1h') as StringValue,
        },
    }),
);