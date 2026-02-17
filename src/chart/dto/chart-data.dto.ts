import { IsNumber } from "class-validator";

export class ChartDataItem {
    @IsNumber()
    hour: number;

    @IsNumber()
    brain: number;

    @IsNumber()
    exercise: number;

    @IsNumber()
    eat: number;

    @IsNumber()
    sleep: number;

    @IsNumber()
    ed: number;
}