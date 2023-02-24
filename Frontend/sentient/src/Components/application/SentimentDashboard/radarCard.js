import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
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
import { Radar } from "react-chartjs-2";
import { colors } from "../../../utils/colors";

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
  radarTitle: {
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
          size: 18,
          family: "Roboto",
        },
      },
    },
    scales: {
      r: {
        ticks: {
          // https://www.chartjs.org/docs/latest/axes/radial/#ticks
          backdropColor: "transparent", // https://www.chartjs.org/docs/latest/axes/_common_ticks.html
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

const getData = (dataset, labels, secondary_labels) => {
  return {
    labels,
    datasets: dataset.map((data, idx) => {
      return {
        label: secondary_labels[idx],
        data: data,
        borderColor: colors[idx][0],
        backgroundColor: colors[idx][1],
        pointBackgroundColor: colors[idx][2],
        tension: 0.1,
      };
    }),
  };
};

export default function RadarCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.radarCard}>
      <CardContent>
        <div
          style={{
            height: `${props.size}vh`,
          }}
        >
          <Radar
            type={"radar"}
            data={getData(props.data, props.labels, props.secondary_labels)}
            options={getOptions(props.title)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
