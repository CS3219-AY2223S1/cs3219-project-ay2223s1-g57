import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import {
  makeStyles,
  Typography,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

import { useSocket } from "../../context/SocketContext";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Header from "../../components/Header";

import io from "socket.io-client";

const DialogMessage = Object.freeze({
  NOMATCH: "Uhoh! No match found!",
  NORESPONSE: "Uhoh! No response from server!",
});

const useStyles = makeStyles((theme) => ({
  rootBox: {},
  timerContainer: {},
}));

function LobbyPage() {
  const classes = useStyles();

  const navigate = useNavigate();
  const [socket, setSocket] = useSocket();
  const { difficulty } = useLocation().state;
  const [timerReset, setTimerReset] = useState(false);
  const [dialogueOpen, setDialogueOpen] = useState(false);
  //   const [roomId, setRoomId] = useState("");
  const [dialogMsg, setDialogMsg] = useState(DialogMessage.NOMATCH);
  const serverNoResponse = useRef(true);

  // Connect to socket
  useEffect(() => {
    setSocket(io.connect("http://localhost:8001"));
  }, [setSocket]);

  useEffect(() => {
    if (socket) {
      // Check connection
      socket.on("connect", () => {
        console.log(socket.id);
      });

      // Emit match event upon connecting
      socket.emit("match", difficulty);

      socket.on("matchSuccess", (data) => {
        console.log("matchSuccess", data.roomId);

        navigate("/session", {
          state: {
            matchRoomId: data.roomId,
            difficulty: difficulty,
          },
        });
      });

      //   socket.on("searching", (data) => {
      //     console.log("searching", data.roomId);
      //     setRoomId(data.roomId);
      //   });

      socket.on("matchFail", (data) => {
        console.log("matchFail", data.roomId);

        setDialogueOpen(true);
        serverNoResponse.current = false;
      });
    }
  }, [socket, navigate, difficulty]);

  const handleTryAgain = () => {
    socket.emit("match", difficulty);

    setDialogueOpen(false);

    setTimerReset(!timerReset);
  };

  const handleGoBack = () => {
    socket.disconnect();
    setSocket(null);

    navigate("/home");
  };

  return (
    <div className={classes.rootBox}>
      <Header />

      <Typography>Matching... </Typography>

      <div className={classes.timerContainer}>
        <CountdownCircleTimer
          isPlaying
          key={timerReset}
          duration={30}
          colors={"#000000"}
          onComplete={() => {
            setTimeout(() => {
              // Give 5sec lag time for server to respond
              if (serverNoResponse) {
                setDialogMsg(DialogMessage.NORESPONSE);
                setDialogueOpen(true);
              }
            }, 5000);
          }}
        >
          {({ remainingTime }) => remainingTime}
        </CountdownCircleTimer>
      </div>

      <Dialog open={dialogueOpen}>
        <DialogTitle>{dialogMsg}</DialogTitle>
        <List>
          <ListItem button onClick={handleTryAgain}>
            <ListItemText primary={"Try again"} />
          </ListItem>

          <ListItem button onClick={handleGoBack}>
            <ListItemText primary={"Go back"} />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}

export default LobbyPage;
