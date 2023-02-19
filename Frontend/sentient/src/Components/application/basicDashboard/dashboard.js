import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import leaves_1 from "../../../Assets/Leaves_1.png";
import leaves_2 from "../../../Assets/Leaves_2.png";
import { NavBar } from "../../navbar";
import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import SideNav from "../sideNav";
import NewQueryButton from "../../fab";
import ProfileCard from "./profileCard";
import InfoCard from "./infoCard";
import ChartCard from "./chartCard";

const useStyles = makeStyles((theme) => ({
  dashboard: {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#B5E3FF",
  },
  dashboardContainer: {
    backgroundColor: "transparent",
    width: "100vw",
    minHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "flex-start",
    zIndex: 1,
    paddingBottom: "8px",
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

export const BasicDashboard = () => {
  const classes = useStyles();

  return (
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
        spacing={1}
      >
        <Grid item container xs={12} spacing={1}>
          <Grid item xs={6}>
            <ProfileCard />
          </Grid>
          <Grid item container xs={6} spacing={1}>
            <Grid item xs={6}>
              <InfoCard
                title="Average Likes"
                content={"16.1k"}
                inference={"-1% in the last month"}
              />
            </Grid>
            <Grid item xs={6}>
              <InfoCard
                title="Average Views"
                content={"4.2m"}
                inference={"+5% in the last month"}
              />
            </Grid>
            <Grid item xs={6}>
              <InfoCard
                title="Average Retweets"
                content={"2.3k"}
                inference={"-3.2% in the last month"}
              />
            </Grid>
            <Grid item xs={6}>
              <InfoCard
                title="Average Quote Tweets"
                content={"1.8k"}
                inference={"+4.4% in the last month"}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={12} spacing={1}>
          <Grid item xs={12}>
            <ChartCard title="Month wise Likes Trend" />
          </Grid>
          <Grid item xs={12}>
            <ChartCard title="Month wise Views Trend" />
          </Grid>
          <Grid item xs={12}>
            <ChartCard title="Month wise Retweets Trend" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
