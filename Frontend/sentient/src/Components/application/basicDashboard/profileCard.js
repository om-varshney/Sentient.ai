import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardHeader } from "@mui/material";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  profileCard: {
    backgroundColor: "#ceecfd !important",
  },
  profileTitle: {
    backgroundColor: "rgba(106,112,255,0.9)",
    color: "#fff",
  },
}));

export default function ProfileCard() {
  const classes = useStyles();
  return (
    <Card className={classes.profileCard}>
      <CardHeader title="Profile Info" className={classes.profileTitle} />
      <CardContent>
        <Typography>Content</Typography>
      </CardContent>
    </Card>
  );
}
