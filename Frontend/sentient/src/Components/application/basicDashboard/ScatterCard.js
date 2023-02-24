import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardHeader } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const useStyles = makeStyles((theme) => ({
  chartCard: {
    backgroundColor: "aliceblue !important",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    borderRadius: "12px !important",
    boxShadow: "none !important",
    "&:hover": {
      border: "1px solid transparent",
      cursor: "pointer",
      boxShadow: "20px 20px 60px #caced1, -20px -20px 60px #ffffff !important",
    },
    "& .MuiCardHeader-title": {
      fontSize: "1rem !important",
    },
  },
  chartTitle: {
    backgroundColor: "rgba(106,112,255,0.8)",
    color: "#fff",
  },
  chartContent: {
    height: "50vh !important",
  },
}));

export const getOptions = (title) => {
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
    elements: {
      point: {
        borderWidth: 2,
        radius: 8,
        hoverRadius: 10,
      },
    },
    scales: {
      x: {
        ticks: {
          callback: (value) => {
            return Intl.NumberFormat("en-US", {
              notation: "compact",
              maximumFractionDigits: 1,
            }).format(value);
          },
        },
      },
      y: {
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
  };
};

const getData = (data_x, data_y, label) => {
  return {
    datasets: [
      {
        label: label,
        data: Array.from({ length: data_x.length }, (element, index) => ({
          x: data_x[index],
          y: data_y[index],
        })),
        borderColor: "rgba(244,118,239,1)",
        backgroundColor: "rgba(244,118,239,0.5)",
      },
    ],
  };
};

export default function ScatterCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.chartCard} elevation={1}>
      <CardContent>
        <div
          style={{
            height: "40vh",
          }}
        >
          <Scatter
            options={getOptions(props.title)}
            data={getData(props.data_x, props.data_y, props.label)}
            type="Scatter"
          />
        </div>
      </CardContent>
    </Card>
  );
}
