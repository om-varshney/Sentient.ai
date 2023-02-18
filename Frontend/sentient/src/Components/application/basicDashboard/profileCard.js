import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import welcomeIllustration from "../../../Assets/Welcome Illustration.png";

const useStyles = makeStyles((theme) => ({
  profileCard: {
    position: "relative",
    backgroundColor: "#94D6FF !important",
    height: "100%",
    borderRadius: "4px",
  },
  backgroundEffect1: {
    position: "absolute",
    height: "30vh",
    bottom: 0,
    right: 0,
    zIndex: 1,
  },
  primaryButton: {
    position: "absolute",
    borderRadius: "500px !important",
    backgroundColor: "rgba(244,118,239,1) !important",
    color: "white !important",
    fontSize: "1rem !important",
  },
}));

export default function ProfileCard() {
  const classes = useStyles();
  return (
    <Card className={classes.profileCard} elevation={0}>
      <CardContent>
        <img
          src={welcomeIllustration}
          alt=""
          className={classes.backgroundEffect1}
        />
        <Typography variant="h3" style={{ color: "rgba(63,61,86,0.9)" }}>
          Welcome,
        </Typography>
        <Typography variant="h6" style={{ color: "rgba(63,61,86,0.8)" }}>
          Here is an analysis of your Tweet query.
        </Typography>
      </CardContent>
    </Card>
  );
}
