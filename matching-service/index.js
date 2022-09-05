import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import {
  createMatch,
  leaveRoom,
  disconnect,
  foundMatchWithin30s,
} from "./controller/match-controller.js";
import { syncBuiltinESMExports } from "module";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

app.get("/", (req, res) => {
  res.send("Hello World from matching-service");
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("connected " + String(socket.id));

  socket.on("match", (difficulty) => {
    createMatch(socket, difficulty).then((params) => {
      const roomId = params[0];
      const matchFound = params[1];

      if (matchFound) {
        io.to(roomId).emit("matchSuccess", {
          roomId: roomId,
        });
        return;
      }

      socket.emit("searching", {
        roomId: roomId,
      });
      foundMatchWithin30s(socket.id).then((found) => {
        if (!found) {
          socket.leave(roomId);
          socket.emit("matchFail", {
            text: "Match not found after 30 seconds",
          });
        }
      });
    });
  });

  socket.on("leaveRoom", (roomId) => {
    leaveRoom(socket.id, roomId).then(() => {
      socket.leave(roomId);
      io.to(roomId).emit("matchLost", {
        text: "Partner has left the room",
      });
      io.in(roomId).socketsLeave(roomId);
    });
  });

  socket.on("disconnect", () => {
    disconnect(socket.id).then((roomId) => {
      if (roomId) {
        socket.leave(roomId);
        io.to(roomId).emit("matchLost", {
          text: "Partner has disconnected",
        });
        io.in(roomId).socketsLeave(roomId);
      }
    });
    console.log("disconnected " + String(socket.id));
  });
});

httpServer.listen(8001);
