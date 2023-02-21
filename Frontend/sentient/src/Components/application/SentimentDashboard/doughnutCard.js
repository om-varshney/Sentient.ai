import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardHeader } from "@mui/material";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Radar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(ArcElement, Tooltip, Legend);
const useStyles = makeStyles((theme) => ({
  doughnutCard: {
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
      display: true,
      text: "Emotion Pie Chart",
    },
  },
};
const labels = ["Happy", "Angry", "Surprise", "Sad", "Fear"];
export const data = {
  labels,
  datasets: [
    {
      label: "Percentage",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
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
      {/*<CardHeader title="Info" className={classes.doughnutTitle} />*/}
      <CardContent>
        <div
          style={{
            height: "35vh",
          }}
        >
          <Doughnut data={data} options={options} type="doughnut" />
        </div>
      </CardContent>
    </Card>
  );
}
