import { Controller } from '@nestjs/common';
import { ChronotypeService } from './chronotype.service';

@Controller('chronotype')
export class ChronotypeController {
  constructor(private readonly chronotypeService: ChronotypeService) {}
}
