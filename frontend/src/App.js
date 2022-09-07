import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { createStyles, makeStyles, Box } from "@material-ui/core";

import { SocketProvider } from "./context/SocketContext";
import SignupPage from "./pages/SignUp/SignupPage";
import HomePage from "./pages/Home/HomePage";
import LobbyPage from "./pages/Lobby/LobbyPage";
import SessionPage from "./pages/Session/SessionPage";

const useStyles = makeStyles((theme) =>
  createStyles({
    rootBox: {
      display: "flex",
      flexDirection: "column",
      padding: "4rem",
    },
  })
);

const App = () => {
  const classes = useStyles();

  return (
    <SocketProvider>
      <div className="App">
        <Box className={classes.rootBox}>
          <Router>
            <Routes>
              <Route
                exact
                path="/"
                element={<Navigate replace to="/signup" />}
              ></Route>
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/lobby" element={<LobbyPage />} />
              <Route path="/session" element={<SessionPage />} />
            </Routes>
          </Router>
        </Box>
      </div>
    </SocketProvider>
  );
};

export default App;
