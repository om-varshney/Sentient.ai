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

const labels = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
];

export const data = {
  labels,
  datasets: [
    {
      label: "2021",
      data: [
        12204, 6556, 10144, 16361, 8133, 12935, 9754, 17012, 8001, 9997, 18364,
        17172, 6206, 6048, 10565, 7770, 13716, 7132, 7217, 9186, 9988, 13105,
        11139, 7576, 10431, 10701, 18841, 3861, 9330, 2273, 17193,
      ],
      borderColor: "#F476EF",
      backgroundColor: "rgba(244,118,239,0.2)",
      tension: 0.4,
      fill: "origin",
    },
    {
      label: "2022",
      data: [
        1053, 14202, 9642, 4397, 18956, 18014, 2942, 4915, 12235, 13303, 18673,
        18479, 10417, 3870, 14586, 13358, 11682, 4934, 10817, 6754, 1035, 4626,
        10723, 17594, 2080, 2362, 17182, 2340, 13320, 12559, 11241,
      ],
      borderColor: "#6A70FF",
      backgroundColor: "rgba(106,112,255,0.2)",
      tension: 0.4,
      fill: "origin",
    },
    {
      label: "2023",
      data: [
        5750, 8895, 12795, 3656, 4286, 1381, 9549, 2028, 10497, 12247, 16374,
        5087, 7940, 14442, 13156, 18924, 4585, 17502, 15878, 11164, 9762, 14833,
        18729, 17566, 10523, 5107, 11511, 8168, 10196, 7357, 10748,
      ],
      borderColor: "#87BF10",
      backgroundColor: "rgba(135,191,16,0.2)",
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
