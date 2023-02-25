import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import leaves_1 from "../../Assets/Leaves_1.png";
import leaves_2 from "../../Assets/Leaves_2.png";
import logo from "../../Assets/Logo.svg";
import notFound from "../../Assets/Not Found.png";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import {
  setQuery,
  setTrendData,
  setTrendMessage,
  setView,
} from "../../Redux/actions/sentientActions";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  logo: {
    height: "3rem",
    position: "fixed",
    top: "5vh",
  },
  loadingPage: {
    backgroundColor: "#eef2f6",
    width: "100vw",
    height: "100vh",
  },
  mainHeading: {
    color: "rgba(63,61,86,0.9)",
    fontFamily: "Roboto",
    fontSize: "1.2rem !important",
    textAlign: "center",
  },
  backgroundEffect1: {
    position: "fixed",
    bottom: 0,
    left: 0,
    zIndex: 1,
  },
  backgroundEffect2: {
    position: "fixed",
    top: 0,
    right: 0,
  },
  primaryButton: {
    backgroundColor: "#F476EF !important",
    borderRadius: "500px !important",
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
  dispatch(setQuery(""));
};

export const InvalidAccount = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Grid
      className={classes.loadingPage}
      container
      xs={12}
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <img src={leaves_1} alt="" className={classes.backgroundEffect1} />
      <img src={leaves_2} alt="" className={classes.backgroundEffect2} />
      <img src={logo} alt="Sentient Logo" className={classes.logo} />
      <Stack spacing={3} alignItems="center" style={{ maxWidth: "50vw" }}>
        <img src={notFound} alt="not found" width="60%" />
        <Typography className={classes.mainHeading}>
          Sorry but {props.handle.replace(/(.{15})..+/, "$1...")} either does
          not exist or may not have enough tweets for analysis. Please note that
          accounts with less than 200 Original Tweets are not eligible for
          analysis.
        </Typography>
        <Button
          autoFocus
          variant="contained"
          className={classes.primaryButton}
          size="large"
          onClick={() => setHome(dispatch)}
        >
          Try another Account
        </Button>
      </Stack>
    </Grid>
  );
};
