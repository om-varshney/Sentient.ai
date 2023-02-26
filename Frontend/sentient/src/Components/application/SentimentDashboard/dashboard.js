import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import leaves_1 from "../../../Assets/Leaves_1.png";
import leaves_2 from "../../../Assets/Leaves_2.png";
import { NavBar } from "../../navbar";
import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import SideNav from "../sideNav";
import NewQueryButton from "../../fab";
import DoughnutCard from "./doughnutCard";
import ChartCard from "./chartCard";
import RadarCard from "./radarCard";
import ProfileCard from "../basicDashboard/profileCard";
import { PreLoad } from "../loadingScreen";
import { isEmpty } from "../../../utils/utils";
import InfoTrendCard from "../basicDashboard/infoTrendCard";

const useStyles = makeStyles((theme) => ({
  dashboard: {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "aliceblue",
  },
  dashboardContainer: {
    backgroundColor: "#eef2f6",
    width: "100vw",
    minHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "flex-start",
    zIndex: 1,
    padding: "16px",
    borderRadius: "12px !important",
    marginTop: "16px !important",
    marginBottom: "24px !important",
  },
  backgroundEffect1: {
    position: "fixed",
    bottom: 0,
    left: 0,
    zIndex: 1,
  },
  backgroundEffect2: {
    position: "fixed",
    top: 0,
    right: 0,
  },
}));

export const SentimentDashboard = ({ handle, data, message }) => {
  const classes = useStyles();

  return (
    <>
      {isEmpty(data) ? (
        <PreLoad message={message} />
      ) : data["analysis"] ? (
        <Grid container className={classes.dashboard}>
          <img src={leaves_1} alt="" className={classes.backgroundEffect1} />
          <img src={leaves_2} alt="" className={classes.backgroundEffect2} />
          <NavBar />
          <NewQueryButton />
          <Grid
            item
            container
            xs={9}
            className={classes.dashboardContainer}
            spacing={3}
          >
            <Grid
              item
              container
              xs={12}
              spacing={3}
              style={{ paddingLeft: 0, paddingTop: 0 }}
            >
              <Grid item xs={4}>
                <ProfileCard handle={handle} />
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={12}
              spacing={3}
              style={{ paddingLeft: 0, paddingTop: 0 }}
            >
              <Grid item xs={4}>
                <InfoTrendCard
                  title={
                    data["positive_trend"]
                      ? "Avg. Positive Score"
                      : "Data not Available"
                  }
                  content={
                    data["positive_trend"]
                      ? data["positive_trend"]["mean"]
                      : "404"
                  }
                  inference={
                    data["positive_trend"]
                      ? data["positive_trend"]["inference"]
                      : null
                  }
                  data={data["positive_trend"]["trend"]}
                />
              </Grid>
              <Grid item xs={4}>
                <InfoTrendCard
                  title={
                    data["neutral_trend"]
                      ? "Avg. Neutral Score"
                      : "Data not available"
                  }
                  content={
                    data["neutral_trend"]
                      ? data["neutral_trend"]["mean"]
                      : "Unavailable"
                  }
                  inference={
                    data["neutral_trend"]
                      ? data["neutral_trend"]["inference"]
                      : null
                  }
                  data={data["neutral_trend"]["trend"]}
                />
              </Grid>
              <Grid item xs={4}>
                <InfoTrendCard
                  title={
                    data["negative_trend"]
                      ? "Avg. Negative Score"
                      : "Data not Available"
                  }
                  content={
                    data["negative_trend"]
                      ? data["negative_trend"]["mean"]
                      : "Unavailable"
                  }
                  inference={
                    data["negative_trend"]
                      ? data["negative_trend"]["inference"]
                      : null
                  }
                  data={data["negative_trend"]["trend"]}
                />
              </Grid>
            </Grid>
            <Grid item container xs={12} spacing={3} style={{ paddingLeft: 0 }}>
              <Grid item xs={8}>
                {/*<RadarCard />*/}
              </Grid>
              <Grid item container xs={4} spacing={3} alignContent="flex-start">
                <Grid item xs={12}>
                  <DoughnutCard />
                </Grid>
                <Grid item xs={12}>
                  <DoughnutCard />
                </Grid>
              </Grid>
            </Grid>
            <Grid item container xs={12} spacing={3} style={{ paddingLeft: 0 }}>
              <Grid item container xs={4} spacing={3} alignContent="flex-start">
                <Grid item xs={12}>
                  <ChartCard />
                </Grid>
              </Grid>
              <Grid item xs={8}>
                {/*<RadarCard />*/}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : null}
    </>
  );
};
