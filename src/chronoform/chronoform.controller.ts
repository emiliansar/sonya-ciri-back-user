import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ChronoformService } from './chronoform.service';
import { AuthGuard } from 'src/auth/guards/jwt.guard';
import { chronoformCreateControllerDto } from './dto/chronoform.dto';

// chronoform = Анкета хронотипа человека

@Controller('chronoform')
export class ChronoformController {
  constructor(private readonly chronoformService: ChronoformService) {}

  @UseGuards(AuthGuard)
  @Get('chronoform')
  async getChronoform(
    @Request() req
  ) {
    // return console.log(req.user)
    return this.chronoformService.getChronoform(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Post('update')
  async updateProfile(
    @Request() req,
    @Body() dto: chronoformCreateControllerDto
  ) {
    return this.chronoformService.updateChronoform({
      ...dto,
      user_id: req.user.sub
    });
  }

  @UseGuards(AuthGuard)
  @Post('delete')
  async deleteProfile(
    @Request() req
  ) {
    return this.chronoformService.deleteChronoform(req.user.sub);
  }
}
