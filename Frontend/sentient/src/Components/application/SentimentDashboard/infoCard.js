import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardHeader } from "@mui/material";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  infoCard: {
    backgroundColor: "#ceecfd !important",
    "& .MuiCardHeader-title": {
      fontSize: "1rem !important",
    },
  },
  infoTitle: {
    backgroundColor: "rgba(106,112,255,0.9)",
    color: "#fff",
  },
}));

export default function InfoCard() {
  const classes = useStyles();
  return (
    <Card className={classes.infoCard}>
      <CardHeader title="Info" className={classes.infoTitle} />
      <CardContent>
        <Typography>Content</Typography>
      </CardContent>
    </Card>
  );
}
