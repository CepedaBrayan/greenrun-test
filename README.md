<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Greenrun-test is an API-RESTful developed in [Nest](https://github.com/nestjs/nest) v16.13.1, using a [Node](https://nodejs.org/es/) v16.13.1, with a microservices software model and following the SOLID and DRY principles, using [Jest](https://jestjs.io) for unit testing and JWT for access auth.
Greenrun-test is deployed in [Heroku](https://id.heroku.com/login) both the backend and the database, that is a [PostgreSQL](https://www.postgresql.org/) database, which is connected with the backend through [Prisma](https://www.prisma.io) as ORM tool.
This App wass deployed automatically by CI/CD workflows (CI: GitHub Actions, CD: Heroku auto deployment), using the MASTER branch for it deploy, using too GitHub repo secrets.

## URLS

```bash
# local
http://localhost:3000/api/

# deploy
http://localhost:3000/apidoc/
```

## Installation

```bash
# install dependencies
$ npm install

# build the project
$ npm run build
```

## Environment vars needed

```bash
# set environment variables
PORT
POSTGRESQL_DATABASE_URL
BCRYPT_SALT_ROUNDS
AUTH_CODE_CREATE_ADMIN
JWT_SECRET_KEY
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

```

## DOCUMENTATION

This application is documented using [Swagger](https://swagger.io/), you can also look de docs in both environments:

```bash
# local
http://localhost:3000/apidoc/

# deploy
https://greenrun-sports-backend.herokuapp.com/apidoc/

```

And also there is a [Insomnia](https://insomnia.rest/) collection to test the API manually (there are both environments in itself: local and deploy, setup the vars before to test), that it's in

```bash
# collection file
root/Insomnia API/ Insomnia_2022-08-09.json

```

## FRAMEWORK SOURCE: Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
