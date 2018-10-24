# Product Fetcher Generator

A tool to generate Product Fetcher VIM code for a given store based on defined data points
from the Product Observation Event schema. See
[Honey Virtual Interpreted Modules](https://github.com/honeyscience/honey-store-vims/tree/master/vims-v2) for current
VIM code examples.

## Introduction

There are two standalone "packages" (client and server) bundled together in this repository for convenience sake. In the
future, these may live in their respective repositories. Each package has it's own `src` directory, `package.json`,
and so on. This keeps their dependencies small and isolated from each other.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

If you haven't already, install [Docker for Mac](https://docs.docker.com/v17.12/docker-for-mac/install/).

Grab a copy of the project:

```
git clone https://github.com/honeyscience/product-fetcher-generator.git
```
In both the `client` and `server` directories run `npm i`.

### Development

There are several ways to get the development environment up and running.

To run both client and server, first build the Docker images from the Dockerfile. Because the linter uses the 
*@honeyscience/eslint-config* private npm package, make sure that `HONEY_NPM_TOKEN` is set which can be found at 
`~/.npmrc`. You don't have to repeat this step every time you want to run the containers (only if you change something that requires a new build).

```
docker-compose build --build-arg HONEY_NPM_TOKEN="$HONEY_NPM_TOKEN"
```

Then you can run the docker containers using

```
docker-compose up
```

The Express server is now running under *http://localhost:3000* and the React client under *http://localhost:8080*

It's also possible to run just the client or the server either with Docker or just the NPM scripts defined in the 
package.json file

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

