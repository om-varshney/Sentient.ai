import { makeStyles } from "@mui/styles";
import { Button, Grid } from "@mui/material";
import logo from "../Assets/Logo.svg";
import { useDispatch } from "react-redux";
import {
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

const setHome = (dispatch) => {
  dispatch(
    setView({
      homeState: true,
      trendDashboard: false,
      sentimentDashboard: false,
    })
  );
  dispatch(setTrendData({}));
  dispatch(setTrendMessage(""));
};

export const NavBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Grid item xs={9} className={classes.navBar}>
      <img src={logo} alt="Logo" className={classes.logo} />
      <Button className={classes.navButton} onClick={() => setHome(dispatch)}>
        Home
      </Button>
      <Button className={classes.navButton}>About</Button>
    </Grid>
  );
};
