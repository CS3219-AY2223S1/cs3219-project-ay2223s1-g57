import express, { Express, Request, Response } from "express";

const app: Express = express();
const port: number = 8000;
app.get("/", (_req: Request, res: Response) => {
  res.send(`Express + TypeScript Server`);
});

app.listen(port, () => {
  console.log(`[user-service] Server is listening on Port ${port}`);
});
