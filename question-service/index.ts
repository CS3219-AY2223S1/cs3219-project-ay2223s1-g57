import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./src/api/routes";
import dbInit from "./src/db/init";

const port = 8002; // Can replace with input from .env file

export const getApp = () => {
  const app: Express = express();
  app.use(cors()); // config cors so that front-end can use
  app.options("*", cors());

  const current_api = "/api/question-service";

  // middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // endpoints
  app.get("/", (req: Request, res: Response) => {
    res.send(
      `Welcome to peerprep API!\n Endpoints are available at http://localhost:${port}${current_api}`
    );
  });

  app.use(current_api, router);

  return app;
};

export const startApp = () => {
  const app = getApp();

  try {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error: any) {
    console.log(`Error occurred: ${error.message}`);
  }
};

// Start db and server
export const start = () => {
  dbInit();
  startApp();
};

start();
