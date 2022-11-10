FROM node:16.17.1-alpine3.15

WORKDIR /usr/src/frontend

COPY package*.json ./

RUN npm install

COPY . .
# RUN npm run build

EXPOSE 3000

CMD npm run dev