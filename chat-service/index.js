import express from "express";
import cors from "cors";
import { createServer } from "http";
import { handleGetKeys } from "./controller/chat-controller.js";
import { authenticateMiddleware } from "./middleware.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

app.get("/", (req, res) => {
    res.send("Hello World from chat-service");
});

app.post("/api/chat-service/keys", authenticateMiddleware, (req, res) =>
    handleGetKeys(req, res)
);

const httpServer = createServer(app);

httpServer.listen(8003);
