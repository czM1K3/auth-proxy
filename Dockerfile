FROM denoland/deno:alpine-1.24.3 as builder

WORKDIR /app

COPY src/deps.ts ./
RUN deno cache ./deps.ts

COPY src/auth.ts src/env.ts src/server.ts ./

RUN deno compile --allow-read --allow-net --allow-env ./server.ts

FROM debian:stable-slim as runner
WORKDIR /app

RUN adduser --uid 1002 deno

COPY public ./public
COPY --from=builder /app/server ./auth-proxy

USER deno

EXPOSE 3000

CMD ["./auth-proxy"]
