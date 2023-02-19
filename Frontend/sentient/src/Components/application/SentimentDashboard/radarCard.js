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
    backgroundColor: "#ceecfd !important",
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
      display: false,
      text: "Chart.js Bar Chart",
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
};

const labels = ["Happy", "Angry", "Surprise", "Sad", "Fear"];

export const data = {
  labels,
  datasets: [
    {
      label: "Positive",
      data: [102, 101, 94, 110, 93],
      borderColor: "#F476EF",
      backgroundColor: "rgba(244,118,239,0.5)",
      tension: 0.1,
    },
    {
      label: "Negative",
      data: [103, 113, 107, 89, 88],
      borderColor: "#6A70FF",
      backgroundColor: "rgba(106,112,255,0.5)",
      tension: 0.1,
    },
    {
      label: "Neutral",
      data: [100, 87, 98, 92, 123],
      borderColor: "#87BF10",
      backgroundColor: "rgba(135,191,16,0.5)",
      tension: 0.1,
    },
  ],
};

export default function RadarCard() {
  const classes = useStyles();
  return (
    <Card className={classes.radarCard}>
      <CardHeader title="Radar Chart" className={classes.radarTitle} />
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
