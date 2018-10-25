# Product Fetcher Generator

A tool to generate Product Fetcher VIM code for a given store based on defined data points
from the Product Observation Event schema. See
[Honey Virtual Interpreted Modules](https://github.com/honeyscience/honey-store-vims/tree/master/vims-v2) for current
VIM code examples.

## Introduction

There are two standalone "packages" (client and server) bundled together in this repository for convenience sake. In the
future, these may live in their respective repositories. Each package has it's own `src` directory, `package.json`,
and so on. This keeps their dependencies small and isolated from one another.

## Getting Started

The following instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

If you haven't already, install [Docker for Mac](https://docs.docker.com/v17.12/docker-for-mac/install/).

After that, grab a copy of the project from Github:

```
git clone https://github.com/honeyscience/product-fetcher-generator.git
```
**Note**: If you encounter an error involving missing dependencies, such as `Error: Cannot find module ...`,
when bringing up the containers with the `docker-compose up` command, then run `npm i` in both the *server* and
*client* directories on the host machine.

### Development

There are several ways to get the development environment up and running. For simplicity and consistency, the recommend 
way is using [Docker](https://www.docker.com/why-docker).

Each package can be run independently but typically you would want to run both client and server simultaneously.
Because the linter uses the *@honeyscience/eslint-config* private npm package, make sure that the `HONEY_NPM_TOKEN`
environment variable is set (the value can be found at `~/.npmrc`) before running the following build command:

```
docker-compose build --build-arg HONEY_NPM_TOKEN="$HONEY_NPM_TOKEN"
```

**Note**: You only have to repeat this step if you change a service's Dockerfile or the contents of its build directory!

Once built, run the docker containers:

```
docker-compose up
```

The Express server is now running under *http://localhost:3000* and the React client under *http://localhost:8080*

It's also possible to run just the client or the server either with Docker or just the NPM scripts defined in the 
`package.json` file.

**Cleanup**

To stop running containers without removing them use

```
docker-compose stop
```

To stop and remove containers, networks, volumes, and images created by `up` use

```
docker-compose down -v
```
**Database**

Locally, the server uses a MySQL DB for persistence. You can connect to the running instance using any supported client
of your choosing, e.g. Sequel Pro.
Taken from the DEV config file:

```
{
    user: 'app',
    password: 'app',
    host: '127.0.0.1',
    port: 3306,
    database: 'vim_generator',
}    
```

### Production

TBD

## Built With

* [React](https://reactjs.org/)
* [Express](https://expressjs.com/en/4x/api.html)
* [Node.js](https://nodejs.org/dist/latest-v8.x/docs/api/)
* [GraphQL](https://graphql.org/)

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Authors

* Integration and Tooling Team at Honey

## License

This project is unlicensed.

