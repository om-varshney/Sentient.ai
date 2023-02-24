import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { makeStyles } from "@mui/styles";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { colors } from "../../../utils/colors";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const useStyles = makeStyles((theme) => ({
  trendCard: {
    backgroundColor: "aliceblue !important",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    borderRadius: "12px !important",
    boxShadow: "none !important",
    "&:hover": {
      border: "1px solid transparent",
      boxShadow: "20px 20px 60px #caced1, -20px -20px 60px #ffffff !important",
      cursor: "pointer",
    },
    "& .MuiCardHeader-title": {
      fontSize: "1rem !important",
    },
  },
}));

const getOptions = (title, x_label, y_label) => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 18,
          family: "Roboto",
        },
      },
      tooltip: {
        callbacks: {
          title: () => null,
        },
      },
    },
    scales: {
      x: {
        title: {
          text: x_label,
          display: true,
        },
        display: true,
      },
      y: {
        title: { text: y_label, display: true },
        ticks: {
          callback: (value) => {
            return Intl.NumberFormat("en-US", {
              notation: "compact",
              maximumFractionDigits: 1,
            }).format(value);
          },
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
};

const getData = (dataset, label_set) => {
  const labels = Array.from({ length: dataset[0].length }, (v, k) => k + 1);
  return {
    labels,
    datasets: dataset.map((data, idx) => {
      return {
        label: label_set[idx],
        data: data,
        borderColor: colors[idx][0],
        backgroundColor: colors[idx][1],
        pointBackgroundColor: colors[idx][2],
        tension: 0.4,
        fill: "origin",
      };
    }),
  };
};

export default function TrendCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.trendCard}>
      <CardContent>
        <div
          style={{
            height: "40vh",
          }}
        >
          <Line
            options={getOptions(props.title, props.x_label, props.y_label)}
            data={getData(props.data, props.label_set)}
            type={"line"}
          />
        </div>
      </CardContent>
    </Card>
  );
}
