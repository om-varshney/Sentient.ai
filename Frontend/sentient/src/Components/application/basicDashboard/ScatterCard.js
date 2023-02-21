import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardHeader } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
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
import { faker } from "@faker-js/faker";

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
  chartCard: {
    backgroundColor: "aliceblue !important",
    borderRadius: "12px !important",
    boxShadow: "20px 20px 60px #ccd3d9, -20px -20px 60px #ffffff !important",
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
      display: false,
    },
  },
};

const labels = Array.from({ length: 31 }, (v, k) => k + 1);

export const data = {
  labels,
  datasets: [
    {
      label: "2021",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: "#F476EF",
      backgroundColor: "rgba(244,118,239,0.2)",
      tension: 0.4,
      fill: "origin",
    },
    {
      label: "2022",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: "#6A70FF",
      backgroundColor: "rgba(106,112,255,0.2)",
      tension: 0.4,
      fill: "origin",
    },
    {
      label: "2023",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: "#87BF10",
      backgroundColor: "rgba(135,191,16,0.2)",
      tension: 0.4,
      fill: "origin",
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
          <Line options={options} data={data} type={"line"} />
        </div>
      </CardContent>
    </Card>
  );
}
