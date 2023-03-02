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

const getOptions = (title) => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 14,
          family: "Roboto",
        },
      },
    },
    rotation: 45 * Math.PI,
  };
};

const getData = (data, labels, secondaryLabel) => {
  return {
    labels,
    datasets: [
      {
        label: secondaryLabel,
        data: data,
        backgroundColor: [
          "rgba(135,191,16,0.5)",
          "rgba(244,118,239,0.5)",
          "rgba(106,112,255,0.5)",
          "rgba(137,99,99,0.5)",
          "rgba(255,105,97,0.5)",
        ],
        borderColor: ["#87BF10", "#F476EF", "#6A70FF", "#896363", "#ff6961"],
        borderWidth: 3,
      },
    ],
  };
};

export default function DoughnutCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.doughnutCard}>
      <CardContent>
        <div
          style={{
            height: `35vh`,
          }}
        >
          <Doughnut
            data={getData(props.data, props.labels, props.secondaryLabel)}
            options={getOptions(props.title)}
            type="doughnut"
          />
        </div>
      </CardContent>
    </Card>
  );
}
