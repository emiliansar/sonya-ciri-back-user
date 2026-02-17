import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ChronoformModule } from './chronoform/chronoform.module';
import { ChronotypeModule } from './chronotype/chronotype.module';
import { ChartModule } from './chart/chart.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'default-secret',
      signOptions: {
        expiresIn: (process.env.JWT_EXPIRE_IN || '1h') as any,
      }
    }),
    AuthModule,
    ChartModule,
    ChronotypeModule,
    ChronoformModule,
    UserModule,
    PrismaModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService
  ],
})
export class AppModule {}
