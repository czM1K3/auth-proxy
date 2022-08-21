# Auth Proxy
This is proxy that requires user to enter a password to proxy website. It's little bit fancier than basic auth. It is written in TypeScript with Deno on top of [Opine](https://github.com/cmorten/opine) (clone of [Express](https://github.com/expressjs/express)).

## Usage
- Main usage is with [Docker](https://www.docker.com/).
- Command to run is:
	```bash
	docker run -d -p 3000:3000 -e PASSWORD=yourpassword -e SERVICE_ADDRESS=http://127.0.0.1:8080 -e LOGIN_TIME=3600 ghcr.io/czm1k3/auth-proxy
	```
- You should change environment variables and maybe port.
	- You can change left side of port to match port you like the most.
	- **PASSWORD** is here in plain text. Quotes and backslahes may be problematic.
	- **SERVICE_ADDRESS** is address of your service. In docker-compose you can use name of service instead of ip address.
	- **LOGIN_TIME** is time for token to expire.

## Development
### Requirements
- [Deno](https://deno.land/)
- [Make](https://www.gnu.org/software/make/) (for easier commands)
### Running dev
```bash
make
```
### Building
```bash
make build
```
or
```bash
docker build . -t auth-proxy
```