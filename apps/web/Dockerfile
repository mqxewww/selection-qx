FROM oven/bun:1.3.11-alpine AS builder

WORKDIR /app

COPY package.json bun.lock ./

COPY apps/server/package.json ./apps/server/
COPY apps/web/package.json ./apps/web/

RUN bun install --frozen-lockfile

COPY . .

RUN cd apps/web && bun run type-check
RUN cd apps/web && bun run build

FROM nginx:alpine

COPY --from=builder /app/apps/web/dist /usr/share/nginx/html
COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]