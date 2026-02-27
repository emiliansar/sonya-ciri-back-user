#!/bin/sh
# Применяем миграции (если нужно)
npx prisma migrate deploy
# Запускаем приложение
node dist/main