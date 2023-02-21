import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import welcomeIllustration from "../../../Assets/Welcome Illustration.png";
import { Button, IconButton, Stack } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";

const useStyles = makeStyles((theme) => ({
  profileCard: {
    position: "relative",
    backgroundColor: "transparent !important",
    height: "100%",
    borderRadius: "4px",
  },
  backgroundEffect1: {
    position: "absolute",
    height: "15vh",
    bottom: 0,
    right: 0,
    zIndex: 1,
  },
  primaryButton: {
    position: "absolute",
    borderRadius: "500px !important",
    // backgroundColor: "rgba(244,118,239,1) !important",
    backgroundImage: "linear-gradient(45deg, #6A70FF, #FF8AFA) !important",

    color: "white !important",
    fontSize: "1rem !important",
  },
  launchButton: {
    backgroundColor: "#6A70FF !important",
    color: "white !important",
  },
}));

export default function ProfileCard() {
  const classes = useStyles();
  return (
    <Card className={classes.profileCard} elevation={0}>
      <CardContent>
        {/*<img*/}
        {/*  src={welcomeIllustration}*/}
        {/*  alt=""*/}
        {/*  className={classes.backgroundEffect1}*/}
        {/*/>*/}
        <Stack direction="row" spacing={1}>
          <Button
            size="large"
            className={classes.primaryButton}
            variant="contained"
          >
            @elonmusk
          </Button>
          <IconButton
            variant="contained"
            size="large"
            className={classes.launchButton}
          >
            <LaunchIcon />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
}
