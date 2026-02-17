import { Module } from '@nestjs/common';
import { ChronotypeService } from './chronotype.service';
import { ChronotypeController } from './chronotype.controller';

@Module({
  controllers: [ChronotypeController],
  providers: [ChronotypeService],
  exports: [ChronotypeService]
})
export class ChronotypeModule {}
