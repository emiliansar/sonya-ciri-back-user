#!/bin/sh
# Явно передаем DATABASE_URL из переменных окружения
export DATABASE_URL="$DATABASE_URL"

# Применяем миграции (если нужно)
npx prisma migrate deploy

# Запускаем приложение
node dist/main