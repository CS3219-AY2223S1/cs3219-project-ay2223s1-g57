import express, { Application, Request, Response } from "express";
import cors from "cors";

import { port, allowed_origins } from "./config";
import mainRouter from "./api/routes";
import dbInit from "./db";

export const get = () => {
  const app: Application = express();
  // Body parsing Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.get("/", async (_req: Request, res: Response): Promise<Response> => {
    return res.status(200).send(`Express + TypeScript Server`);
  });

  const allowedOrigins = [allowed_origins];
  const options: cors.CorsOptions = {
    origin: allowedOrigins,
  };

  // Then pass these options to cors:
  app.use(cors(options));
  app.use("/api/v1", mainRouter);
  return app;
};

export const start = () => {
  const app = get();
  try {
    app.listen(port, () => {
      console.log(`[user-service] Server is listening on Port ${port}`);
      console.log(`allowed-origin env-variables test: ${allowed_origins}`);
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error occurred: ${error.message}`);
    } else {
      console.log(`Error occurred: ${error}`);
    }
  }
};

// let retries = 5;

// while (retries) {
//   try {
//     dbInit();
//     break;
//   } catch (err) {
//     console.log(err);
//     retries -= 1;
//     console.log(`retries left: ${retries}`);
//     new Promise((res) => setTimeout(res, 5000));
//   }
// }
dbInit();
start();
