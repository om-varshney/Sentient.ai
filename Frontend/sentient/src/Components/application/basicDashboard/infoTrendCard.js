import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardHeader, Stack } from "@mui/material";
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
import { faker } from "@faker-js/faker";
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

const labels = Array.from({ length: 10 }, (v, k) => k + 1);

export const data = {
  labels,
  datasets: [
    {
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: "#6A70FF",
      backgroundColor: "rgba(106,112,255,0.2)",
      pointBackgroundColor: "#6A70FF",
      tension: 0.6,
      fill: "origin",
    },
  ],
};

export default function InfoTrendCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.infoCard}>
      {/*<CardHeader title={props.title} className={classes.infoTitle} />*/}
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h3" style={{ color: "rgba(63,61,86,0.9)" }}>
            {props.content}
          </Typography>
          {props.inference < 0 ? (
            <ArrowDownwardIcon
              style={{
                fontSize: "32px",
                padding: "4px",
                borderRadius: "500px",
                color: "rgba(255,105,97,1)",
                backgroundColor: "rgba(255,105,97,0.2)",
              }}
            />
          ) : (
            <ArrowUpwardIcon
              style={{
                fontSize: "32px",
                padding: "4px",
                borderRadius: "500px",
                color: "#87BF10",
                backgroundColor: "rgba(135,191,16,0.2)",
              }}
            />
          )}
        </Stack>
        <Typography>{props.title}</Typography>
        <div
          style={{
            height: "10vh",
          }}
        >
          <Line options={options} data={data} type={"line"} />
        </div>
      </CardContent>
    </Card>
  );
}
