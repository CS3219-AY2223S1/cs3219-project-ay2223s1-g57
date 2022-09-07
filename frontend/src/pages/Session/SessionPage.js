import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  makeStyles,
  Typography,
  Dialog,
  DialogTitle,
  ListItem,
  ListItemText,
} from "@material-ui/core";

import { useSocket } from "../../context/SocketContext";
import Header from "../../components/Header";

const useStyles = makeStyles((theme) => ({
  rootBox: {},
}));

const SessionPage = () => {
  const classes = useStyles();

  const navigate = useNavigate();
  const [socket, setSocket] = useSocket();
  const { matchRoomId, difficulty } = useLocation().state;
  const [dialogueOpen, setDialogueOpen] = useState(false);

  useEffect(() => {
    socket.on("matchLost", (data) => {
      setDialogueOpen(true);
    });
  }, [socket]);

  const handleHomeButton = () => {
    socket.disconnect();
    setSocket(null);

    navigate("/home");
  };

  return (
    <div className={classes.rootBox}>
      <Header />
      <Typography>Session Page</Typography>
      <Typography>Room ID: {matchRoomId}</Typography>
      Difficulty: {difficulty}
      <Dialog open={dialogueOpen}>
        <DialogTitle>Uhoh! Your match left!</DialogTitle>
        <ListItem button onClick={handleHomeButton}>
          <ListItemText primary={"Home"} />
        </ListItem>
      </Dialog>
    </div>
  );
};

export default SessionPage;
