## Description

Api Consumer is a sample of management credit account.

This api is based on CQRS and event sourcing architecture with [Nest](https://github.com/nestjs/nest) framework and [Eventstore](https://eventstore.com/) + [MongoDB](https://www.mongodb.com/fr) databases.

## Installation

```bash
# eventstore + mongodb + mongodb express
$ docker-compose up
# persistent subscription to eventstore 
$ ./scripts/init-subscription.sh

# api
$ npm install
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

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Urls

Swagger Api : http://localhost:3000/api/#/

Eventstore : http://localhost:2113/web/index.html#/ (login: admin / password : changeit)

MongoDb : http://localhost:8081/
