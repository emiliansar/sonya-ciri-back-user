import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ChronoformResponseDto } from 'src/chronoform/dto/chronoform.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChronotypeService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async getChronotype(userId: number) {
        const chronotype = await this.prisma.chronotype.findUnique({
            where: { user_id: userId }
        });

        if (!chronotype) {
            throw new NotFoundException('Хронотип не найден');
        }

        return chronotype;
    }

    async updateChronotype(chronoformId: number) {
        if (!chronoformId) {
            throw new InternalServerErrorException('ID анкеты отсутствует');
        }

        const chronoform = await this.prisma.chronoform.findUnique({
            where: { id: chronoformId }
        });

        if (!chronoform) {
            throw new InternalServerErrorException('Анкета не существует');
        }

        const existChronotype = await this.prisma.chronotype.findUnique({
            where: {
                user_id: chronoform.user_id
            }
        });

        if (!existChronotype) {
            return this.createChronotype(chronoform);
        }

        const chronotype = this.calculatingChronotype(chronoform)

        return await this.prisma.chronotype.update({
            where: {
                id: existChronotype.id
            }, data: {
                type: chronotype,
                updated_at: new Date()
            }
        })
    }

    async createChronotype(
        chronoform: ChronoformResponseDto
    ) {
        const chronotype = this.calculatingChronotype(chronoform)

        return await this.prisma.chronotype.create({
            data: {
                user_id: chronoform.user_id,
                type: chronotype,
                updated_at: new Date()
            }
        })
    }

    calculatingChronotype(chronoform: ChronoformResponseDto) {
        let lark = 0;
        let owl = 0;
        let pigeon = 0;

        if (chronoform.time_wake_up >= 5
            && chronoform.time_wake_up < 8
        ) {
            lark++;
        } else if (chronoform.time_wake_up >= 8
            && chronoform.time_wake_up < 10
        ) {
            pigeon++;
        } else if (chronoform.time_wake_up >= 10
            && chronoform.time_wake_up < 14
        ) {
            owl++;
        }

        if (chronoform.time_to_bed >= 21
            && chronoform.time_wake_up < 23
        ) {
            lark++;
        } else if (chronoform.time_wake_up >= 23
            && chronoform.time_wake_up < 24
        ) {
            pigeon++;
        } else if (chronoform.time_wake_up >= 0
            && chronoform.time_wake_up < 5
        ) {
            owl++;
        }

        chronoform.time_great.forEach(hour => {
            if (hour >= 8 && hour < 13) {
                lark++;
            } else if (
                hour >= 16 && hour < 23
            ) {
                owl++;
            } else if (
                hour >= 10 && hour < 19
            ) {
                pigeon++;
            }
        });

        chronoform.exam_time.forEach(hour => {
            if (hour >= 8 && hour < 13) {
                lark++;
            } else if (
                hour >= 16 && hour < 23
            ) {
                owl++;
            } else if (
                hour >= 10 && hour < 19
            ) {
                pigeon++;
            }
        });

        chronoform.exercise_time.forEach(hour => {
            if (hour >= 0 && hour < 13) {
                lark++;
            } else if (
                hour >= 18 && hour < 24
            ) {
                owl++;
            } else if (
                hour >= 0 && hour < 24
            ) {
                pigeon++;
            }
        });

        chronoform.important_meal_time.forEach(hour => {
            if (hour >= 5 && hour < 8) {
                lark++;
            } else if (
                hour >= 8 && hour < 12
            ) {
                pigeon++;
            } else {
                owl++;
            }
        });

        if (
            chronoform.energy_decline === 'Да, сильный'
        ) {
            lark++;
        } else if (
            chronoform.energy_decline === 'Умеренный'
        ) {
            pigeon++;
        }else if (
            chronoform.energy_decline === 'Почти нет'
        ) {
            pigeon++;
        } else if (
            chronoform.energy_decline === 'Нет'
        ) {
            owl++;
        }

        if (
            chronoform.early_rise === 'Да, без проблем'
        ) {
            lark++;
        } else if (
            chronoform.energy_decline === 'С трудом, но возможно'
        ) {
            pigeon++;
        }else if (
            chronoform.energy_decline === 'Практически невозможно'
        ) {
            owl++;
        }

        if (
            chronoform.daytime_sleep === 'Часто, если это возможно'
        ) {
            lark++;
        } else if (
            chronoform.daytime_sleep === 'Да, иногда'
        ) {
            pigeon++;
        }else if (
            chronoform.daytime_sleep === 'Никогда'
        ) {
            owl++;
        }

        if (
            chronoform.state_morning === 'Свежий и бодрый'
        ) {
            lark++;
        } else if (
            chronoform.state_morning === 'В тумане но постепенно раскачиваюсь'
        ) {
            pigeon++;
        }else if (
            chronoform.state_morning === 'Усталым, с тяжёлыми веками'
        ) {
            owl++;
        }

        if (
            chronoform.daily_routine === 'Ранний подъём и ранний отход ко сну'
        ) {
            lark++;
        } else if (
            chronoform.daily_routine === 'Гибкий график с пиком активности днём'
        ) {
            pigeon++;
        }else if (
            chronoform.daily_routine === 'Поздний подъём и работа/активность вечером'
        ) {
            owl++;
        }

        if (
            chronoform.state_morning === 'Свежий и бодрый'
        ) {
            lark++;
        } else if (
            chronoform.state_morning === 'В тумане но постепенно раскачиваюсь'
        ) {
            pigeon++;
        }else if (
            chronoform.state_morning === 'Усталым, с тяжёлыми веками'
        ) {
            owl++;
        }

        chronoform.when_tired.forEach(hour => {
            if (hour >= 5 && hour < 13) {
                owl++;
            } else if (
                hour >= 13 && hour < 15
            ) {
                lark++;
            } else if (
                hour >= 15 && hour < 24
            ) {
                owl++;
            }
        });

        if (
            chronoform.me_desc === '«Я люблю начинать день с чёткого плана»'
        ) {
            lark++;
        } else if (
            chronoform.me_desc === '«Мне нужно время, чтобы войти в ритм»'
        ) {
            pigeon++;
        }else if (
            chronoform.me_desc === '«Я предпочитаю работать, когда все спят»'
        ) {
            owl++;
        }

        if (lark > owl && lark > pigeon) {
            return 'Жаворонок'
        } else if (
            owl > lark && owl > pigeon
        ) {
            return 'Сова'
        } else if (
            pigeon > lark && pigeon > owl
        ) {
            return 'Голубь'
        } else {
            return 'Неопределённый тип'
        }
    }
}
