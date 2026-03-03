FROM oven/bun:1.3.10-alpine AS base

WORKDIR /app

COPY package.json bun.lock ./

COPY apps/server/package.json ./apps/server/
COPY apps/web/package.json ./apps/web/

RUN bun install --frozen-lockfile

FROM base AS builder

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN bun run build

FROM oven/bun:1.3.10-alpine AS server_prod

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/server ./apps/server

WORKDIR /app/apps/server

EXPOSE 3000

CMD ["bun", "run", "src/index.ts"]

FROM nginx:mainline-alpine AS web_prod

COPY --from=builder /app/apps/web/dist /usr/share/nginx/html
COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]