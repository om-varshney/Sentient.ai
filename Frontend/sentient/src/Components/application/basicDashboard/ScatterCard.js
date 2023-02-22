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

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Scatter Plot Likes Vs Impressions",
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
};

export const data = {
  datasets: [
    {
      label: "Views/Likes",
      data: Array.from({ length: 50 }, () => ({
        x: faker.datatype.number({ min: 0, max: 5000 }),
        y: faker.datatype.number({ min: 200, max: 500 }),
      })),
      borderColor: "rgba(244,118,239,1)",
      backgroundColor: "rgba(244,118,239,0.5)",
    },
  ],
};

export default function ScatterCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.chartCard} elevation={1}>
      {/*<CardHeader title={props.title} className={classes.chartTitle} />*/}
      <CardContent>
        <div
          style={{
            height: "40vh",
          }}
        >
          <Scatter options={options} data={data} />
        </div>
      </CardContent>
    </Card>
  );
}