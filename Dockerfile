FROM denoland/deno:alpine-1.24.3 as builder

WORKDIR /app
COPY auth.ts env.ts server.ts ./

RUN deno compile --allow-read --allow-net --allow-env server.ts

FROM debian:stable-slim as runner
WORKDIR /app

RUN adduser --uid 1002 deno

COPY login.html ./
COPY --from=builder /app/server ./auth-proxy

USER deno

EXPOSE 3000

CMD ["./auth-proxy"]
