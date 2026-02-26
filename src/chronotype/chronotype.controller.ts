import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ChronotypeService } from './chronotype.service';
import { AuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('chronotype')
export class ChronotypeController {
  constructor(private readonly chronotypeService: ChronotypeService) {}

  @UseGuards(AuthGuard)
  @Get('')
  getChronotype(
    @Request() req
  ) {
    return this.chronotypeService.getChronotype(req.user.sub);
  }
}
