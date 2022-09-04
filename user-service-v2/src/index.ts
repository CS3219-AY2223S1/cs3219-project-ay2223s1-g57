import express, { Application, Request, Response } from "express";
import { port } from "./config";

const app: Application = express();

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", async (_req: Request, res: Response): Promise<Response> => {
  return res.status(200).send(`Express + TypeScript Server`);
});

try {
  app.listen(port, () => {
    console.log(`[user-service] Server is listening on Port ${port}`);
  });
} catch (error) {
  if (error instanceof Error) {
    console.log(`Error occurred: ${error.message}`);
  } else {
    console.log(`Error occurred: ${error}`);
  }
}
