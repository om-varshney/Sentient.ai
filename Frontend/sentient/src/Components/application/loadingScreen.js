import Grid from "@mui/material/Grid";
import { makeStyles, styled } from "@mui/styles";
import leaves_1 from "../../Assets/Leaves_1.png";
import leaves_2 from "../../Assets/Leaves_2.png";
import logo from "../../Assets/Logo.svg";
import meditate from "../../Assets/Meditate.png";
import Typography from "@mui/material/Typography";
import {
  Box,
  LinearProgress,
  linearProgressClasses,
  Stack,
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  logo: {
    height: "3rem",
    position: "fixed",
    top: "5vh",
  },
  loadingPage: {
    backgroundColor: "aliceblue",
    width: "100vw",
    height: "100vh",
  },
  mainHeading: {
    color: "rgba(63,61,86,0.9)",
    fontFamily: "Roboto",
    fontSize: "0.8rem !important",
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

const Progress = styled(LinearProgress)(({ theme }) => ({
  height: "15px !important",
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#eef2f6",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#87BF10",
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
      <img src={meditate} alt="meditate" width="30%" className="float" />
      <Stack spacing={1} alignItems={"center"}>
        <Typography variant={"h6"} style={{ color: "rgba(63,61,86,0.9)" }}>
          Sit back and relax while Sentient prepares your Analytics Report.
        </Typography>
        <Box sx={{ width: "50%" }}>
          <Progress
            variant={props.progress > 0 ? "determinate" : "indeterminate"}
            value={props.progress}
          />
        </Box>
        <Typography className={classes.mainHeading}>{props.content}</Typography>
      </Stack>
    </Grid>
  );
};
