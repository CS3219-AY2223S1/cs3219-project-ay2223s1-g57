FROM node:16.17-alpine3.15

WORKDIR /usr/src/chat-service

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8003

CMD npm run dev