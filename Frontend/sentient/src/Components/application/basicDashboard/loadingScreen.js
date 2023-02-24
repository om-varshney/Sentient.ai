import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import leaves_1 from "../../../Assets/Leaves_1.png";
import leaves_2 from "../../../Assets/Leaves_2.png";
import logo from "../../../Assets/Logo.svg";
import meditate from "../../../Assets/Meditate.png";
import Typography from "@mui/material/Typography";

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
      <img src={meditate} alt="meditate" width="30%" id="meditate" />
      <Typography variant={"h6"} style={{ color: "rgba(63,61,86,0.9)" }}>
        Sit back and relax while Sentient prepares your Analytics Report.
      </Typography>
      <Typography className={classes.mainHeading}>{props.message}</Typography>
    </Grid>
  );
};
