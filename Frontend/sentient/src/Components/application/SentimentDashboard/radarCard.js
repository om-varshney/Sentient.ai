import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardHeader } from "@mui/material";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  radarCard: {
    backgroundColor: "#94D6FF !important",
  },
  radarTitle: {
    backgroundColor: "#6A70FF",
    color: "#fff",
  },
}));

export default function RadarCard() {
  const classes = useStyles();
  return (
    <Card className={classes.radarCard}>
      <CardHeader title="Radar Chart" className={classes.radarTitle} />
      <CardContent>
        <Typography>Content</Typography>
      </CardContent>
    </Card>
  );
}
