FROM node:16.17-alpine3.15

WORKDIR /usr/src/matching-service

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8001

CMD npm run dev