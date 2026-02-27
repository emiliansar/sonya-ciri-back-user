#!/bin/sh
export DATABASE_URL="$DATABASE_URL"
npx prisma migrate deploy
node dist/src/main