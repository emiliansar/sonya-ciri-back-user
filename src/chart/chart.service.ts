import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChartDataItem } from './dto/chart-data.dto';

@Injectable()
export class ChartService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async updateChart(chronoformId: number) {
        if (!chronoformId) {
            throw new InternalServerErrorException("updateChart не получил chronoformId")
        }

        const chronoform = await this.prisma.chronoform.findUnique({
            where: {
                id: chronoformId
            }
        });

        if (!chronoform) {
            throw new InternalServerErrorException("Анкета не найдена")
        }

        const existChart = await this.prisma.chart.findUnique({
            where: {
                user_id: chronoform.user_id
            }
        });

        if (!existChart) {
            return this.createChart(chronoformId)
        }

        let chartData = this.createChartData();

        chartData = this.brainGreatTime(
            chronoform.time_great,
            chronoform.exam_time,
            chartData
        );

        chartData = this.exerciseTime(
            chronoform.exercise_time,
            chartData
        );

        chartData = this.eatTime(
            chronoform.important_meal_time,
            chartData
        );

        // chartData = this.sleepTime(
        //     [profile.time_wake_up],
        //     chartData
        // );

        chartData = this.applySleep(
            chronoform.time_to_bed,
            chronoform.time_wake_up,
            chartData
        );

        chartData = this.edTime(
            chronoform.when_tired,
            chartData
        );

        console.log(chartData);

        return await this.prisma.chart.update({
            where: {
                id: existChart.id
            },
            data: {
                chart: chartData as any,
            }
        });
    }

    async createChart(chronoformId: number) {
        if (!chronoformId) {
            throw new InternalServerErrorException("createChart не получил chronoformId")
        }

        const chronoform = await this.prisma.chronoform.findUnique({
            where: {
                id: chronoformId
            }
        });

        if (!chronoform) {
            throw new InternalServerErrorException("Анкета не найдена")
        }

        let chartData = this.createChartData();

        chartData = this.brainGreatTime(
            chronoform.time_great,
            chronoform.exam_time,
            chartData
        );

        chartData = this.exerciseTime(
            chronoform.exercise_time,
            chartData
        );

        chartData = this.eatTime(
            chronoform.important_meal_time,
            chartData
        );

        // chartData = this.sleepTime(
        //     [profile.time_wake_up],
        //     chartData
        // );

        chartData = this.applySleep(
            chronoform.time_to_bed,
            chronoform.time_wake_up,
            chartData
        );

        chartData = this.edTime(
            chronoform.when_tired,
            chartData
        );

        console.log(chartData);

        return await this.prisma.chart.create({
            data: {
                user_id: chronoform.user_id,
                chart: chartData as any
            }
        });
    }

    createChartData() {
        const chartData: ChartDataItem[] = [];

        for (let hour = 0; hour < 24; hour++) {
            chartData.push({
                hour: hour,
                brain: 0,
                exercise: 0,
                eat: 0,
                sleep: 0,
                ed: 0
            });
        }
        return chartData;
    }

    brainGreatTime(
        great_time: number[],
        exam_time: number[],
        chartData: ChartDataItem[]
    ) {
        const energyHours: number[] = [...new Set([...great_time, ...exam_time])];

        energyHours.forEach(hour => {
            if (hour >= 0 && hour < 24) {
                chartData[hour].brain = 1;
            }
        });

        return chartData;
    }

    exerciseTime(
        exercise_time: number[],
        chartData: ChartDataItem[]
    ) {
        exercise_time.forEach(hour => {
            if (hour >= 0 && hour < 24) {
                chartData[hour].exercise = 1;
            }
        });

        return chartData;
    }

    eatTime(
        eat_time: number[],
        chartData: ChartDataItem[]
    ) {
        eat_time.forEach(hour => {
            if (hour >= 0 && hour < 24) {
                chartData[hour].eat = 1;
            }
        });

        return chartData;
    }

    // sleepTime(
    //     sleep_time: number[],
    //     chartData: ChartDataItem[]
    // ) {
    //     sleep_time.forEach(hour => {
    //         if (hour >= 0 && hour < 24) {
    //             chartData[hour].sleep = 1;
    //         }
    //     });

    //     return chartData;
    // }

    applySleep(
        time_to_bed: number,
        time_wake_up: number,
        chartData: ChartDataItem[]
    ) {
        let hoursSleep: number[] = [];

        if (time_to_bed > time_wake_up) {
            for (let hour = time_to_bed; hour < 24; hour++) {
                // chartData[hour].sleep = 1;
                hoursSleep = [...new Set([...hoursSleep, hour])]
            }
            for (let hour = 0; hour < time_wake_up; hour++) {
                hoursSleep = [...new Set([...hoursSleep, hour])]
            }
        } else {
            for (let hour = time_to_bed; hour < time_wake_up; hour++) {
                if (hour >= 0 && hour < 24) {
                    hoursSleep = [...new Set([...hoursSleep, hour])]
                }
            }
        }

        hoursSleep.forEach(hour => {
            if (hour >= 0 && hour < 24) {
                chartData[hour].sleep = 1;
            }
        });

        return chartData;
    }

    edTime(
        ed_time: number[],
        chartData: ChartDataItem[]
    ) {
        ed_time.forEach(hour => {
            if (hour >= 0 && hour < 24) {
                chartData[hour].ed = 1;
            }
        });

        return chartData;
    }
}
