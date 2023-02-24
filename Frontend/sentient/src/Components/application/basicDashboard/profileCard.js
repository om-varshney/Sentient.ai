import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { makeStyles } from "@mui/styles";
import { Button, IconButton, Stack } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import { useDispatch } from "react-redux";
import { setNotificationContent } from "../../../Redux/actions/sentientActions";

const useStyles = makeStyles((theme) => ({
  profileCard: {
    position: "relative",
    backgroundColor: "transparent !important",
    height: "100%",
    borderRadius: "4px",
    paddingTop: 0,
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
    textTransform: "none !important",
    backgroundImage: "linear-gradient(45deg, #6A70FF, #FF8AFA) !important",

    color: "white !important",
    fontSize: "1rem !important",
  },
  launchButton: {
    backgroundColor: "#6A70FF !important",
    color: "white !important",
  },
}));

export default function ProfileCard(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Card className={classes.profileCard} elevation={0}>
      <CardContent>
        <Stack direction="row" spacing={1}>
          <Button
            size="large"
            className={classes.primaryButton}
            variant="contained"
            onClick={() =>
              dispatch(
                setNotificationContent({
                  type: "info",
                  msg: `Analytics Report for ${props.handle}`,
                  id: Math.random(),
                })
              )
            }
          >
            {props.handle}
          </Button>
          <IconButton
            variant="contained"
            size="large"
            className={classes.launchButton}
            target="_blank"
            href={`https://twitter.com/${props.handle}`}
          >
            <LaunchIcon />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
}
