FROM node:13.8.0-alpine3.10

WORKDIR /usr/app

ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV:-production}

ARG PORT
ENV PORT $PORT

ARG HOST
ENV HOST $HOST

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]