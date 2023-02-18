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
  },
  radarTitle: {
    backgroundColor: "rgba(106,112,255,0.9)",
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

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "2021",
      data: [12, 14, 16, 18, 9, 5, 30],
      borderColor: "#F476EF",
      backgroundColor: "rgba(244,118,239,0.5)",
      tension: 0.1,
    },
    {
      label: "2022",
      data: [23, 34, 1, 2, 56, 22, 12],
      borderColor: "#6A70FF",
      backgroundColor: "rgba(106,112,255,0.5)",
      tension: 0.1,
    },
    {
      label: "2023",
      data: [55, 34, 15, 30, 4, 29, 88],
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
