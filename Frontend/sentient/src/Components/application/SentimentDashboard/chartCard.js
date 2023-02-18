import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardHeader } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

const useStyles = makeStyles((theme) => ({
  chartCard: {
    backgroundColor: "#ceecfd !important",
  },
  chartTitle: {
    backgroundColor: "rgba(106,112,255,0.9)",
    color: "#fff",
  },
}));

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "2021",
      data: [12, 14, 16, 18, 9, 5, 30],
      borderColor: "rgba(244,118,239,1)",
      backgroundColor: "rgba(244,118,239,0.5)",
      borderRadius: 50,
      borderWidth: 2,
    },
    {
      label: "2022",
      data: [23, 34, 1, 2, 56, 22, 12],
      borderColor: "rgba(106,112,255,1)",
      backgroundColor: "rgba(106,112,255,0.5)",
      borderRadius: 50,
      borderWidth: 2,
    },
    {
      label: "2023",
      data: [55, 34, 15, 30, 4, 29, 88],
      borderColor: "rgba(135,191,16,1)",
      backgroundColor: "rgba(135,191,16,0.5)",
      borderRadius: 50,
      borderWidth: 2,
    },
  ],
};

export default function ChartCard() {
  const classes = useStyles();
  return (
    <Card className={classes.chartCard}>
      <CardHeader title="Bar Chart" className={classes.chartTitle} />
      <CardContent>
        <div
          style={{
            height: "40vh",
          }}
        >
          <Bar options={options} data={data} type={"bar"} />
        </div>
      </CardContent>
    </Card>
  );
}
