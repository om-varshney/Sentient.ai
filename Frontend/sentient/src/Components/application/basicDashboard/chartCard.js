import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardHeader } from "@mui/material";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  chartCard: {
    backgroundColor: "#94D6FF !important",
  },
  chartTitle: {
    backgroundColor: "#6A70FF",
    color: "#fff",
  },
}));

export default function ChartCard() {
  const classes = useStyles();
  return (
    <Card className={classes.chartCard}>
      <CardHeader title="Trend Chart" className={classes.chartTitle} />
      <CardContent>
        <Typography>Content</Typography>
      </CardContent>
    </Card>
  );
}
