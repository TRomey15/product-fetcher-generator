FROM node:10-alpine

LABEL maintainer="Honey Science, Inc <devs@joinhoney.com>"
LABEL description="Honey Product Fetcher Generator - Client"

ARG NODE_ENV
ENV NODE_ENV "$NODE_ENV"

WORKDIR /app

COPY package*.json ./

ARG HONEY_NPM_TOKEN

RUN echo "//registry.npmjs.org/:_authToken=${HONEY_NPM_TOKEN}" > ~/.npmrc && npm install && rm -f ~/.npmrc

COPY . /app

EXPOSE 8080

CMD [ "npx", "webpack-dev-server", "--config", "webpack.dev.js", "--hot", "--inline", "--host", "0.0.0.0" ]

USER app