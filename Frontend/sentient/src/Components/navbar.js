import { makeStyles } from "@mui/styles";
import { Button, Grid } from "@mui/material";
import logo from "../Assets/Logo.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  setQuery,
  setSentimentData,
  setSentimentMessage,
  setTrendData,
  setTrendMessage,
  setView,
} from "../Redux/actions/sentientActions";

const useStyles = makeStyles((theme) => ({
  logo: {
    height: "4vh",
    marginRight: "auto",
  },
  navBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "transparent",
    height: "10vh",
    zIndex: 1,
  },
  navButton: {
    color: "#3F3D56 !important",
    marginLeft: "2vw !important",
    fontSize: "1rem !important",
  },
}));

const setHome = (dispatch, timer1, timer2) => {
  clearInterval(timer1);
  clearInterval(timer2);
  dispatch(
    setView({
      homeState: true,
      trendDashboard: false,
      sentimentDashboard: false,
    })
  );
  dispatch(setTrendData({}));
  dispatch(setTrendMessage(""));
  dispatch(setSentimentData({}));
  dispatch(setSentimentMessage(""));
  dispatch(setQuery(""));
};

export const NavBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const appState = useSelector((state) => state);
  const timer1 = appState.trendTimer;
  const timer2 = appState.sentimentTimer;

  return (
    <Grid item xs={9} className={classes.navBar}>
      <img src={logo} alt="Logo" className={classes.logo} />
      <Button
        className={classes.navButton}
        onClick={() => setHome(dispatch, timer1, timer2)}
      >
        Home
      </Button>
      <Button className={classes.navButton}>About</Button>
    </Grid>
  );
};
