# Билд стадия
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

# Копируем package.json и yarn.lock
COPY package.json yarn.lock ./

# Устанавливаем зависимости
RUN yarn install --frozen-lockfile

# Копируем исходный код
COPY . .

# Генерируем Prisma клиент
RUN npx prisma generate

# Собираем приложение
RUN yarn build

# Финальная стадия
FROM node:22-alpine

WORKDIR /usr/src/app

# Копируем собранные файлы и зависимости
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/entry.sh ./
COPY --from=builder /usr/src/app/prisma ./prisma

# Даем права на выполнение
RUN chmod +x entry.sh

# Переменные окружения для Prisma
ENV DATABASE_URL=${DATABASE_URL}

# Открываем порт
EXPOSE 3000

# Запускаем приложение
ENTRYPOINT [ "./entry.sh" ]