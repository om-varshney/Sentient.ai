import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const useStyles = makeStyles((theme) => ({
  infoCard: {
    backgroundColor: "aliceblue !important",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    boxShadow: "none !important",
    borderRadius: "12px !important",
    "& .MuiCardHeader-title": {
      fontSize: "1rem !important",
    },
  },
  infoTitle: {
    backgroundColor: "transparent",
    color: "rgba(63,61,86,0.9)",
  },
}));

export default function InfoCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.infoCard}>
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h4" style={{ color: "rgba(63,61,86,0.9)" }}>
            {isNaN(props.content)
              ? props.content
              : Intl.NumberFormat("en-US", {
                  notation: "compact",
                  maximumFractionDigits: 1,
                }).format(props.content)}
          </Typography>
          {props.inference ? (
            <ArrowUpwardIcon
              style={{
                fontSize: "32px",
                padding: "4px",
                borderRadius: "500px",
                color: "#87BF10",
                backgroundColor: "rgba(135,191,16,0.2)",
              }}
            />
          ) : (
            <ArrowDownwardIcon
              style={{
                fontSize: "32px",
                padding: "4px",
                borderRadius: "500px",
                color: "rgba(255,105,97,1)",
                backgroundColor: "rgba(255,105,97,0.2)",
              }}
            />
          )}
        </Stack>
        <Typography variant="body2">{props.message}</Typography>
      </CardContent>
    </Card>
  );
}
