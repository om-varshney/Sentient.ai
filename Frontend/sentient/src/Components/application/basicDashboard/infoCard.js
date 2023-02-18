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
    backgroundColor: "rgba(106,112,255,0.8)",
    color: "#fff",
  },
}));

export default function InfoCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.infoCard}>
      <CardHeader title={props.title} className={classes.infoTitle} />
      <CardContent>
        <Typography variant="h3" style={{ color: "rgba(63,61,86,0.9)" }}>
          {props.content}
        </Typography>
      </CardContent>
    </Card>
  );
}
