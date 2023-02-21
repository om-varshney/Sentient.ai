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
import { faker } from "@faker-js/faker";

const useStyles = makeStyles((theme) => ({
  chartCard: {
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
      display: true,
      text: "Emotion Comparison Bar Chart",
    },
  },
};

const labels = ["Happy", "Angry", "Surprise", "Sad", "Fear"];

export const data = {
  labels,
  datasets: [
    {
      label: "2021",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: "rgba(244,118,239,1)",
      backgroundColor: "rgba(244,118,239,0.5)",
      borderRadius: 4,
      borderWidth: 2,
    },
    {
      label: "2022",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: "rgba(106,112,255,1)",
      backgroundColor: "rgba(106,112,255,0.5)",
      borderRadius: 4,
      borderWidth: 2,
    },
    {
      label: "2023",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
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
      {/*<CardHeader title="Bar Chart" className={classes.chartTitle} />*/}
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
