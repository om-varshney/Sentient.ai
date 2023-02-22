import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
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
  trendCard: {
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
}));

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
    },
    title: {
      display: true,
      text: "Followers With Time",
      font: {
        size: 18,
        family: "Roboto",
      },
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
      beginAtZero: true,
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

const labels = Array.from({ length: 50 }, (v, k) => k + 1);

export const data = {
  labels,
  datasets: [
    {
      label: "Followers",
      data: labels.map(() => faker.datatype.number({ min: 500, max: 1000 })),
      borderColor: "#87BF10",
      backgroundColor: "rgba(135,191,16,0.2)",
      pointBackgroundColor: "#87BF10",
      tension: 0.4,
      fill: "origin",
    },
  ],
};

export default function TrendCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.trendCard}>
      <CardContent>
        <div
          style={{
            height: "35vh",
          }}
        >
          <Line options={options} data={data} type={"line"} />
        </div>
      </CardContent>
    </Card>
  );
}
