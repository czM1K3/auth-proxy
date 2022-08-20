.DEFAULT_GOAL := dev

build:
	@deno compile --allow-read --allow-net --allow-env ./src/server.ts

dev:
	@deno run --allow-read --allow-net --allow-env --watch ./src/server.ts