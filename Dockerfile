FROM node:24-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package*.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

RUN pnpm exec prisma generate

EXPOSE 4000

CMD sh -c "pnpm exec prisma migrate dev && node dist/main"