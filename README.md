# CS3219-AY22/23 G57

## Port Table

Saves all the ports so they don't clash

| Service          | Port |
| ---------------- | ---- |
| Frontend         | 3000 |
| User Service     | 8000 |
| Matching Service | 8001 |
| Question Service | 8002 |

## Frontend

1. Install npm packages using `npm i`.
2. Run Frontend using `npm run dev`.

## User Service

1. Setup a postgres database on your local machine.
2. Create a .env file in /user-service to store credentials for postgres. Refer to [user-service/.env.sample](./user-service/.env.sample) for more info.
3. Install npm packages using `npm i`.
4. Run user-Service using `npm run dev`.

## Matching Service

1. Rename `.env.sample` file to `.env`.
2. Create a Cloud DB URL using Mongo Atlas.
3. Enter the DB URL created as `DB_CLOUD_URI` in `.env` file.
4. For production, in the `.env` file change variable `ENV` from `DEV` to `PROD`.
4. Install npm packages using `npm i`.
5. Run User Service using `npm run dev`.

## Question Service

1. Setup a postgres database on your local machine.
2. Create a .env file in /backend to store credentials for postgres. Refer to [backend/.env.sample](./question-service/.env.sample) for more info.
3. Install npm packages using `npm i`.
4. Run Question Service using `npm run dev`.

**Populating Questions Table**

1. Install `psycopg2` and `python-dotenv` using `pip/pip3`
2. Ensure that the database is running
3. Ensure that the table is created. You can either create the table yourself, or run Question Service to create it via Sequelize
4. Run [database/main.py](question-service/database/main.py) to populate the database. You only need to run this once after the table is created.
