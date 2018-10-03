FROM us.gcr.io/honey-production/minimal-nodejs:8

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . /app

USER node

EXPOSE 3000

CMD [ "npm", "run", "dev-server" ]