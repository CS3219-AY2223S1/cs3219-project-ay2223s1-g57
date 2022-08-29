import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { createStyles, makeStyles } from "@material-ui/core";

import SignupPage from "./pages/SignUp/SignupPage";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    rootBox: {
      display: "flex",
      flexDirection: "column",
      padding: "4rem",
    },
  })
);

function App() {
  const classes = useStyles();

  return (
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
          </Routes>
        </Router>
      </Box>
    </div>
  );
}

export default App;
