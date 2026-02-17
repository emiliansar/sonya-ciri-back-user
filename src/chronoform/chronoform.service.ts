import { Injectable, NotFoundException } from '@nestjs/common';
import { ChartService } from 'src/chart/chart.service';
import { ChronotypeService } from 'src/chronotype/chronotype.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { chronoformCreateServiceDto } from './dto/chronoform.dto';

@Injectable()
export class ChronoformService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly chronotypeService: ChronotypeService,
        private readonly chartService: ChartService
    ) {}

    async getChronoform(userId: string) {
        const chronoform = await this.prismaService.chronoform.findUnique({
            where: {
                user_id: +userId
            }
        });

        if (!chronoform) {
            throw new NotFoundException("Анкета не найдена")
        }

        return chronoform;
    }

    async updateChronoform(
        dto: chronoformCreateServiceDto
    ) {
        const chronoform = await this.prismaService.chronoform.findUnique({
            where: {
                user_id: dto.user_id
            }
        });

        if (!chronoform) {
            return this.createChronoform(dto);
        }

        const updatedChronoform = await this.prismaService.chronoform.update({
            where: {
                id: chronoform.id
            },
            data: {
                user_id: dto.user_id,
                age: dto.age,
                tag: dto.tag,
                time_wake_up: dto.time_wake_up,
                time_to_bed: dto.time_to_bed,
                sleep_quality: dto.sleep_quality,
                time_great: dto.time_great,
                exam_time: dto.exam_time,
                exercise_time: dto.exercise_time,
                important_meal_type: dto.important_meal_type,
                important_meal_time: dto.important_meal_time,
                energy_decline: dto.energy_decline,
                early_rise: dto.early_rise,
                daytime_sleep: dto.daytime_sleep,
                state_morning: dto.state_morning,
                daily_routine: dto.daily_routine,
                when_tired: dto.when_tired,
                me_desc: dto.me_desc,
                great_day_desc: dto.great_day_desc,
                updated_at: new Date()
            }
        });

        await this.chartService.updateChart(updatedChronoform.id)
        await this.chronotypeService.updateChronotype(updatedChronoform.id)
    }

    async createChronoform(
        dto: chronoformCreateServiceDto
    ) {
        const createdChronoform = await this.prismaService.chronoform.create({
            data: {
                user_id: dto.user_id,
                age: dto.age,
                tag: dto.tag,
                time_wake_up: dto.time_wake_up,
                time_to_bed: dto.time_to_bed,
                sleep_quality: dto.sleep_quality,
                time_great: dto.time_great,
                exam_time: dto.exam_time,
                exercise_time: dto.exercise_time,
                important_meal_type: dto.important_meal_type,
                important_meal_time: dto.important_meal_time,
                energy_decline: dto.energy_decline,
                early_rise: dto.early_rise,
                daytime_sleep: dto.daytime_sleep,
                state_morning: dto.state_morning,
                daily_routine: dto.daily_routine,
                when_tired: dto.when_tired,
                me_desc: dto.me_desc,
                great_day_desc: dto.great_day_desc,
                updated_at: new Date()
            }
        });

        await this.chartService.updateChart(createdChronoform.id)
        await this.chronotypeService.updateChronotype(createdChronoform.id)
    }

    async deleteChronoform(userId: number) {
        const chronoform = await this.prismaService.chronoform.findUnique({
            where: {
                user_id: userId
            }
        });

        if (!chronoform) {
            throw new NotFoundException("Анкета не найдена")
        }

        return await this.prismaService.chronoform.delete({
            where: {
                id: chronoform.id
            }
        });
    }
}
