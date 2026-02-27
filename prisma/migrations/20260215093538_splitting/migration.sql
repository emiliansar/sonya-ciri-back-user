-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "unique_name" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chronotype" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chronotype_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chronoform" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "age" INTEGER NOT NULL,
    "tag" TEXT NOT NULL,
    "time_wake_up" INTEGER NOT NULL,
    "time_to_bed" INTEGER NOT NULL,
    "sleep_quality" INTEGER NOT NULL,
    "time_great" INTEGER[],
    "exam_time" INTEGER[],
    "exercise_time" INTEGER[],
    "important_meal_type" TEXT NOT NULL,
    "important_meal_time" INTEGER[],
    "energy_decline" TEXT NOT NULL,
    "early_rise" TEXT NOT NULL,
    "daytime_sleep" TEXT NOT NULL,
    "state_morning" TEXT NOT NULL,
    "daily_routine" TEXT NOT NULL,
    "when_tired" INTEGER[],
    "me_desc" TEXT NOT NULL,
    "great_day_desc" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chronoform_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chart" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "chart" JSONB NOT NULL DEFAULT '[]',

    CONSTRAINT "Chart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "unique_name" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_unique_name_key" ON "User"("unique_name");

-- CreateIndex
CREATE UNIQUE INDEX "Chronotype_user_id_key" ON "Chronotype"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Chronoform_user_id_key" ON "Chronoform"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Chart_user_id_key" ON "Chart"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_unique_name_key" ON "Admin"("unique_name");

-- AddForeignKey
ALTER TABLE "Chronotype" ADD CONSTRAINT "Chronotype_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chronoform" ADD CONSTRAINT "Chronoform_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chart" ADD CONSTRAINT "Chart_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
