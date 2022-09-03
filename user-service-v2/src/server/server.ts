import express, { Express, Request, Response } from "express";
import { port } from "../config";

const app: Express = express();
app.get("/", (_req: Request, res: Response) => {
  res.send(`Express + TypeScript Server`);
});

app.listen(port, () => {
  console.log(`[user-service] Server is listening on Port ${port}`);
});
