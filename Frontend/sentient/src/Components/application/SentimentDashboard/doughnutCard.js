import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardHeader } from "@mui/material";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Radar } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
const useStyles = makeStyles((theme) => ({
  doughnutCard: {
    backgroundColor: "#ceecfd !important",
    "& .MuiCardHeader-title": {
      fontSize: "1rem !important",
    },
  },
  doughnutTitle: {
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
};

export const data = {
  labels: ["Happy", "Angry", "Surprise", "Sad", "Fear"],
  datasets: [
    {
      label: "Percentage",
      data: [0.153067, 0.060004, 0.162693, 0.290934, 0.333302],
      backgroundColor: [
        "rgba(244,118,239,0.5)",
        "rgba(106,112,255,0.5)",
        "rgba(135,191,16,0.5)",
        "rgba(137,99,99,0.5)",
        "rgba(255,105,97,0.5)",
      ],
      borderColor: ["#F476EF", "#6A70FF", "#87BF10", "#896363", "#ff6961"],
      borderWidth: 1,
    },
  ],
};

export default function DoughnutCard() {
  const classes = useStyles();
  return (
    <Card className={classes.doughnutCard}>
      <CardHeader title="Info" className={classes.doughnutTitle} />
      <CardContent>
        <div
          style={{
            height: "30vh",
          }}
        >
          <Doughnut data={data} options={options} type="doughnut" />
        </div>
      </CardContent>
    </Card>
  );
}
