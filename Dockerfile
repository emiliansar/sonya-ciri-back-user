# Билд стадия
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN npx prisma generate
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
COPY --from=builder /usr/src/app/prisma.config.ts ./

RUN chmod +x entry.sh

EXPOSE 3000
ENTRYPOINT [ "./entry.sh" ]