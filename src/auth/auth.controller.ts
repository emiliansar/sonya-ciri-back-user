import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, SigninUserDto } from './dto/user.dto';
import { AuthGuard } from './guards/jwt.guard';
import { RefreshAuthGuard } from './guards/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto)
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Body() dto: SigninUserDto) {
    return this.authService.signin(dto)
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }

  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  refreshToken(@Request() req) {
    console.log('Пришёл refresh на auth: ', req.user.sub)
    return this.authService.refreshToken(req.user.sub)
  }
}
