import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardHeader } from "@mui/material";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  infoCard: {
    backgroundColor: "#94D6FF !important",
  },
  infoTitle: {
    backgroundColor: "#6A70FF",
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
