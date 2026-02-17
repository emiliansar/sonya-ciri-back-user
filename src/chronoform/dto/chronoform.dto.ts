// model Chronoform {
//   id                  Int @default(autoincrement()) @id
//   user_id             Int
//   user                User @relation(fields: [user_id], references: [id])
//   age                 Int
//   tag                 String?
//   time_wake_up        Int
//   time_to_bed         Int
//   sleep_quality       Int
//   time_great          String
//   exam_time           String
//   exercise_time       String
//   important_meal      String
//   important_meal_time DateTime
//   energy_decline      String
//   early_rise          String
//   daytime_sleep       String
//   state_morning       String
//   daily_routine       String
//   when_tired          String
//   me_desc             String
//   great_day_desc      String
//   created_at          DateTime @default(now())
//   updated_at          DateTime @updatedAt
// }

import { IsArray, IsNumber, IsString, Max, Min } from "class-validator";

export class chronoformCreateControllerDto {
  @IsNumber()
  age: number;

  @IsString()
  tag: string;

  @IsNumber()
  time_wake_up: number;

  @IsNumber()
  time_to_bed: number;

  @IsNumber()
  sleep_quality: number;

  @IsArray()
  @IsNumber({}, { each: true })
  @Min(0, { each: true })
  @Max(23, { each: true })
  time_great: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @Min(0, { each: true })
  @Max(23, { each: true })
  exam_time: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @Min(0, { each: true })
  @Max(23, { each: true })
  exercise_time: number[];

  @IsString()
  important_meal_type: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @Min(0, { each: true })
  @Max(23, { each: true })
  important_meal_time: number[];

  @IsString()
  energy_decline: string;

  @IsString()
  early_rise: string;

  @IsString()
  daytime_sleep: string;

  @IsString()
  state_morning: string;

  @IsString()
  daily_routine: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @Min(0, { each: true })
  @Max(23, { each: true })
  when_tired: number[];

  @IsString()
  me_desc: string;

  @IsString()
  great_day_desc: string;
}

export class chronoformCreateServiceDto {
  @IsNumber()
  user_id: number;

  @IsNumber()
  age: number;

  @IsString()
  tag: string;

  @IsNumber()
  time_wake_up: number;

  @IsNumber()
  time_to_bed: number;

  @IsNumber()
  sleep_quality: number;

  @IsArray()
  @IsNumber({}, { each: true })
  @Min(0, { each: true })
  @Max(23, { each: true })
  time_great: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @Min(0, { each: true })
  @Max(23, { each: true })
  exam_time: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @Min(0, { each: true })
  @Max(23, { each: true })
  exercise_time: number[];

  @IsString()
  important_meal_type: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @Min(0, { each: true })
  @Max(23, { each: true })
  important_meal_time: number[];

  @IsString()
  energy_decline: string;

  @IsString()
  early_rise: string;

  @IsString()
  daytime_sleep: string;

  @IsString()
  state_morning: string;

  @IsString()
  daily_routine: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @Min(0, { each: true })
  @Max(23, { each: true })
  when_tired: number[];

  @IsString()
  me_desc: string;

  @IsString()
  great_day_desc: string;
}

export class ChronoformResponseDto {
  id: number;
  user_id: number;
  age: number;
  tag: string;
  time_wake_up: number;
  time_to_bed: number;
  sleep_quality: number;
  time_great: number[];
  exam_time: number[];
  exercise_time: number[];
  important_meal_type: string;
  important_meal_time: number[];
  energy_decline: string;
  early_rise: string;
  daytime_sleep: string;
  state_morning: string;
  daily_routine: string;
  when_tired: number[];
  me_desc: string;
  great_day_desc: string;
  created_at: Date;
  updated_at: Date;
}