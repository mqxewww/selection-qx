FROM oven/bun:1.3.11-alpine

WORKDIR /app

COPY package.json bun.lock ./

COPY apps/server/package.json ./apps/server/

RUN bun install

COPY apps/server/ ./apps/server

RUN mkdir -p /app/aps/server/public
RUN mkdir -p /app/apps/server/data

WORKDIR /app/apps/server
ENV NODE_ENV=production

RUN bun run type-check

EXPOSE 3000

CMD ["sh", "-c", "bun db:push && bun run src/index.ts"]