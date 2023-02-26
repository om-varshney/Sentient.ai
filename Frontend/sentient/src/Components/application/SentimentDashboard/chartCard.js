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
import { colors_dark } from "../../../utils/colors";

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
      text: "Polarity vs Time Analysis",
      font: {
        size: 14,
        family: "Roboto",
      },
    },
  },
};

const getData = (dataset, labels, secondaryLabels) => {
  return {
    labels,
    datasets: dataset.map((data, idx) => {
      return {
        label: secondaryLabels[idx],
        data: data,
        borderColor: colors_dark[idx + 1][0],
        backgroundColor: colors_dark[idx + 1][1],
        borderWidth: 3,
        borderRadius: 4,
      };
    }),
  };
};

export default function ChartCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.chartCard}>
      <CardContent>
        <div
          style={{
            height: "40vh",
          }}
        >
          <Bar
            options={options}
            data={getData(props.data, props.labels, props.secondaryLabels)}
            type={"bar"}
          />
        </div>
      </CardContent>
    </Card>
  );
}
