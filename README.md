# CS3219-AY22/23 G57

## Deploying all services at once

1. Update `.env` file for frontend. Use the credentials stated in [frontend/.env.sample](./frontend/.env.sample).
2. You will need to create your own firebase project with a realtime database to get the codepad to work.
3. Update `.env` file for (PUBNUB) chat-service. You will need to create your own PUBNUB project for the chat service to work.
4. Update `.env` file for (postgres db) user-service. Use the credentials stated in [user-service/.env.sample](./user-service/.env.sample)
5. Update `.env` file for (postgres db) question-service. Use the credentials stated in [question-service/.env.sample](./question-service/.env.sample)
6. Run [question-serivce/db/data.sql](question-serivce/db/data.sql) in your question-service database to populate the db
7. Start Docker
8. Run `docker-compose build`
9. Run `docker-compose up`
10. To access mongodb, install `Mongdo DB Compass` and use `mongodb://localhost:27018` as the URI
11. To access postgres db, install `Postico` and connect to the databases for user-service and question-service in the `.env` file

## Port Table

Saves all the ports so they don't clash

| Service          | Port |
| ---------------- | ---- |
| Frontend         | 3000 |
| User Service     | 8000 |
| Matching Service | 8001 |
| Question Service | 8002 |
| Chat Service     | 8003 |

## Deploying individual services:

## Frontend

1.  Create your own firebase project
2.  Create a .env file in /frontend to store firebase credentials from your own firebase project. Refer to [frontend/.env.sample](./frontend/.env.sample) for more info.
3.  In the frontend directory, create a `dist/` folder
4.  Copy [index.html](frontend/setup/index.html) from `setup/` into `dist/`
5.  Install npm packages using `npm i`.
6.  Run Frontend using `npm run dev`.

## User Service

1. Setup a postgres database on your local machine.
2. Create a .env file in /user-service to store credentials for postgres. Refer to [user-service/.env.sample](./user-service/.env.sample) for more info.
3. Install npm packages using `npm i`.
4. Run User Service using `npm run dev`.

## Matching Service

1. Create a .env file in /matching-service to store credentials for postgres. Refer to [matching-service/.env.sample](./matching-service/.env.sample) for more info.
2. Create a Cloud DB URL using Mongo Atlas.
3. Enter the DB URL created as `DB_CLOUD_URI` in `.env` file.
4. For production, in the `.env` file change variable `ENV` from `DEV` to `PROD`.
5. Install npm packages using `npm i`.
6. Run Matching Service using `npm run dev`.

## Question Service

1. Setup a postgres database on your local machine.
2. Create a .env file in /question-service to store credentials for postgres. Refer to [question-service/.env.sample](./question-service/.env.sample) for more info.
3. Install npm packages using `npm i`.
4. Run Question Service using `npm run dev`.

## Chat Service

1. Create a .env file in /chat-service to store credentials for pubnub. Refer to [chat-service/.env.sample](./chat-service/.env.sample) for more info.
2. Install npm packages using `npm i`.
3. Run Question Service using `npm run dev`.

**Populating Questions Table**

1. Run [question-serivce/db/data.sql](question-serivce/db/data.sql) in your question-service database
