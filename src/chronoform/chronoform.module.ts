import { Module } from '@nestjs/common';
import { ChronoformService } from './chronoform.service';
import { ChronoformController } from './chronoform.controller';
import { ChronotypeService } from 'src/chronotype/chronotype.service';
import { ChartService } from 'src/chart/chart.service';

@Module({
  controllers: [ChronoformController],
  providers: [
    ChronoformService,
    ChronotypeService,
    ChartService
  ],
})
export class ChronoformModule {}
