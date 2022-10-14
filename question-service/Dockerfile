FROM node:16.17.1-alpine3.15

WORKDIR /usr/src/question-service

COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build

EXPOSE 8002

CMD npm run dev