import { Link } from "react-router-dom";

import { makeStyles, Typography, Button } from "@material-ui/core";

import Header from "../../components/Header";

const useStyles = makeStyles((theme) => ({
  rootBox: {},
  difficultyContainer: {},
}));

function HomePage() {
  const classes = useStyles();

  return (
    <div className={classes.rootBox}>
      <Header />
      <div className={classes.difficultyContainer}>
        <Typography>Choose your difficulty level</Typography>
        {["easy", "medium", "hard"].map((difficulty) => (
          <Link
            key={difficulty}
            to="/lobby"
            state={{
              difficulty: difficulty,
            }}
          >
            <Button>
              <Typography variant="h5">{difficulty}</Typography>
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
