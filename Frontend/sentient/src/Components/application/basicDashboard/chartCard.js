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
    backgroundColor: "#ceecfd !important",
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

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "2021",
      data: [12, 14, 16, 18, 9, 5, 30],
      borderColor: "#F476EF",
      backgroundColor: "rgba(244,118,239,0.5)",
      tension: 0.4,
      fill: "origin",
    },
    {
      label: "2022",
      data: [23, 34, 1, 2, 56, 22, 12],
      borderColor: "#6A70FF",
      backgroundColor: "rgba(106,112,255,0.5)",
      tension: 0.4,
      fill: "origin",
    },
    {
      label: "2023",
      data: [55, 34, 15, 30, 4, 29, 88],
      borderColor: "#87BF10",
      backgroundColor: "rgba(135,191,16,0.5)",
      tension: 0.4,
      fill: "origin",
    },
  ],
};

export default function ChartCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.chartCard} elevation={1}>
      <CardHeader title={props.title} className={classes.chartTitle} />
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
