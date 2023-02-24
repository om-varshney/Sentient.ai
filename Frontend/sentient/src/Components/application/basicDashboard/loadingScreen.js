import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import leaves_1 from "../../../Assets/Leaves_1.png";
import leaves_2 from "../../../Assets/Leaves_2.png";
import logo from "../../../Assets/Logo.svg";
import Typography from "@mui/material/Typography";
import { Puff } from "react-loader-spinner";

const useStyles = makeStyles((theme) => ({
  logo: {
    height: "4rem",
  },
  loadingPage: {
    backgroundColor: "#eef2f6",
    width: "100vw",
    height: "100vh",
  },
  mainHeading: {
    color: "rgba(63,61,86,0.9)",
    fontFamily: "Roboto",
    fontSize: "2rem !important",
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
}));

export const PreLoad = (props) => {
  const classes = useStyles();
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
      <Typography className={classes.mainHeading}>{props.message}</Typography>
      <Puff
        height="100"
        width="100"
        color="#605D83"
        ariaLabel="puff-loading"
        visible={true}
      />
    </Grid>
  );
};
