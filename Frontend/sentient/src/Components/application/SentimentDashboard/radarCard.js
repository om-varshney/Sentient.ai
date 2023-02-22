import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardHeader } from "@mui/material";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Radar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const useStyles = makeStyles((theme) => ({
  radarCard: {
    backgroundColor: "aliceblue !important",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    borderRadius: "12px !important",
    boxShadow: "none !important",
    "&:hover": {
      border: "1px solid transparent",
      cursor: "pointer",
      boxShadow: "20px 20px 60px #ccd3d9, -20px -20px 60px #ffffff !important",
    },
    "& .MuiCardHeader-title": {
      fontSize: "1rem !important",
    },
  },
  radarTitle: {
    backgroundColor: "rgba(106,112,255,0.8)",
    color: "#fff",
  },
}));

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Multi Database Radar Chart",
      font: {
        size: 18,
        family: "Roboto",
      },
    },
  },
  scales: {
    r: {
      ticks: {
        // https://www.chartjs.org/docs/latest/axes/radial/#ticks
        backdropColor: "transparent", // https://www.chartjs.org/docs/latest/axes/_common_ticks.html
      },
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

const labels = ["Happy", "Angry", "Surprise", "Sad", "Fear"];

export const data = {
  labels,
  datasets: [
    {
      label: "Positive",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: "#F476EF",
      backgroundColor: "rgba(244,118,239,0.2)",
      pointBackgroundColor: "#F476EF",
      tension: 0.1,
    },
    {
      label: "Negative",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: "#6A70FF",
      backgroundColor: "rgba(106,112,255,0.2)",
      pointBackgroundColor: "#6A70FF",
      tension: 0.1,
    },
    {
      label: "Neutral",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: "#87BF10",
      backgroundColor: "rgba(135,191,16,0.2)",
      pointBackgroundColor: "#87BF10",
      tension: 0.1,
    },
  ],
};

export default function RadarCard() {
  const classes = useStyles();
  return (
    <Card className={classes.radarCard}>
      {/*<CardHeader title="Radar Chart" className={classes.radarTitle} />*/}
      <CardContent>
        <div
          style={{
            height: "80vh",
          }}
        >
          <Radar type={"radar"} data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}
