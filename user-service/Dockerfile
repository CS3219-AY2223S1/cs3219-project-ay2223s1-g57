FROM node

WORKDIR /usr/src/user-service

COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build

EXPOSE 8000

# CMD concurrently \"tsc --watch\" \"nodemon -q dist/index.js\"
CMD npm run dev