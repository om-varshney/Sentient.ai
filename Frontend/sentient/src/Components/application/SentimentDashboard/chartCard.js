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
    "& .MuiCardHeader-title": {
      fontSize: "1rem !important",
    },
  },
  chartTitle: {
    backgroundColor: "rgba(106,112,255,0.8)",
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

const labels = ["Happy", "Angry", "Surprise", "Sad", "Fear"];

export const data = {
  labels,
  datasets: [
    {
      label: "2021",
      data: [0.57762792, 0.28462649, 0.70438316, 0.88914215, 0.20583956],
      borderColor: "rgba(244,118,239,1)",
      backgroundColor: "rgba(244,118,239,0.5)",
      borderRadius: 4,
      borderWidth: 2,
    },
    {
      label: "2022",
      data: [0.48356862, 0.48569303, 0.08021181, 0.64363857, 0.64410439],
      borderColor: "rgba(106,112,255,1)",
      backgroundColor: "rgba(106,112,255,0.5)",
      borderRadius: 4,
      borderWidth: 2,
    },
    {
      label: "2023",
      data: [0.60680703, 0.98198985, 0.37310414, 0.10417164, 0.74886403],
      borderColor: "rgba(135,191,16,1)",
      backgroundColor: "rgba(135,191,16,0.5)",
      borderRadius: 4,
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
