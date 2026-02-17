import { Body, Controller, Get, Patch, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/guards/jwt.guard';
import { PatchUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return this.userService.getUser(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Patch('patch')
  async patchProfile(
    @Request() req,
    @Body() dto: PatchUserDto
  ) {
    console.log("Пришёл patch на user'а: ", req.user.sub)
    return this.userService.patchUser({
      ...dto,
      id: req.user.sub
    });
  }

  @UseGuards(AuthGuard)
  @Patch('delete')
  async deleteProfile(@Request() req) {
    console.log("Пришёл delete на user'а: ", req.user.sub)
    return this.userService.deleteUser(req.user.sub);
  }
}
