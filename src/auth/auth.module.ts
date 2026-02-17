import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RefreshJwtStrategy } from './strategies/refresh.strategy';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    RefreshJwtStrategy
  ],
  exports: [
    AuthService
  ]
})
export class AuthModule {}
