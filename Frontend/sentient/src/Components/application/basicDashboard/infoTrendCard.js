import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const useStyles = makeStyles((theme) => ({
  infoCard: {
    backgroundColor: "aliceblue !important",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    borderRadius: "12px !important",
    boxShadow: "none !important",
    "&:hover": {
      border: "1px solid transparent",
      boxShadow: "20px 20px 60px #caced1, -20px -20px 60px #ffffff !important",
      cursor: "pointer",
    },
    "& .MuiCardHeader-title": {
      fontSize: "1rem !important",
    },
  },
  infoTitle: {
    backgroundColor: "transparent",
    color: "rgba(63,61,86,0.9)",
  },
}));

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: {
      callbacks: {
        title: () => null,
      },
    },
  },
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
  elements: {
    point: {
      borderWidth: 1,
      radius: 4,
      hoverRadius: 6,
    },
  },
};

const getData = (data) => {
  const labels = Array.from({ length: data.length }, (v, k) => k + 1);
  return {
    labels,
    datasets: [
      {
        data: data,
        borderColor: "#6A70FF",
        backgroundColor: "rgba(106,112,255,0.2)",
        pointBackgroundColor: "#6A70FF",
        tension: 0.6,
        fill: "origin",
      },
    ],
  };
};

export default function InfoTrendCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.infoCard}>
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h3" style={{ color: "rgba(63,61,86,0.9)" }}>
            {isNaN(props.content)
              ? props.content
              : Intl.NumberFormat("en-US", {
                  notation: "compact",
                  maximumFractionDigits: 1,
                }).format(props.content)}
          </Typography>
          {props.inference === null ? null : props.inference ? (
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
        <Typography>{props.title}</Typography>
        {props.data ? (
          <div
            style={{
              height: "10vh",
            }}
          >
            <Line options={options} data={getData(props.data)} type={"line"} />
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
