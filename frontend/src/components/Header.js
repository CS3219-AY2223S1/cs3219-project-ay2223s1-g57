import {
  makeStyles,
  createStyles,
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    appbar: {
      background: "none",
      boxShadow: "none",
    },
    logo: {
      color: "#000000",
      fontSize: "1.5rem",
    },
  })
);

const Header = () => {
  const classes = useStyles();
  return (
    <div>
      <AppBar className={classes.appbar}>
        <Toolbar>
          <Typography variant={"h1"} className={classes.logo}>
            Peerprep
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
