import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import leaves_1 from "../../../Assets/Leaves_1.png";
import leaves_2 from "../../../Assets/Leaves_2.png";
import iceBall from "../../../Assets/Ice Ball.png";
import { NavBar } from "../../navbar";
import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import SideNav from "../sideNav";
import NewQueryButton from "../../fab";
import ProfileCard from "./profileCard";
import InfoTrendCard from "./infoTrendCard";
import ScatterCard from "./ScatterCard";
import TrendCard from "./trendCard";
import InfoCard from "./infoCard";
import DoughnutCard from "../SentimentDashboard/doughnutCard";

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
            <ProfileCard />
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
            <InfoTrendCard title="Avg. Views" content={"4.2m"} inference={+5} />
          </Grid>
          <Grid item xs={4}>
            <InfoTrendCard
              title="Avg. Likes"
              content={"16.1k"}
              inference={-1}
            />
          </Grid>
          <Grid item xs={4}>
            <InfoTrendCard
              title="Avg. Retweets"
              content={"2.3k"}
              inference={-3.2}
            />
          </Grid>
          {/*<Grid item xs={3}>*/}
          {/*  <InfoCard*/}
          {/*    title="Avg. Quote Tweets"*/}
          {/*    content={"1.8k"}*/}
          {/*    inference={4.4}*/}
          {/*  />*/}
          {/*</Grid>*/}
        </Grid>
        <Grid item container xs={12} spacing={3} style={{ paddingLeft: 0 }}>
          <Grid item xs={10}>
            <TrendCard />
          </Grid>
          <Grid item xs={2}>
            <InfoCard
              content="44k"
              inference={1}
              message="Followers Per Tweet"
            />
          </Grid>
        </Grid>
        <Grid item container xs={12} spacing={3} style={{ paddingLeft: 0 }}>
          <Grid item container xs={2} spacing={3} alignContent="flex-start">
            <Grid item xs={12}>
              <InfoCard
                content="231"
                inference={-1}
                message="Likes per thousand views"
              />
            </Grid>
            <Grid item xs={12}>
              <InfoCard
                content="122"
                inference={1}
                message="Retweets per thousand views"
              />
            </Grid>
          </Grid>
          <Grid item xs={5}>
            <ScatterCard title="Month wise Likes Trend" />
          </Grid>
          <Grid item xs={5}>
            <ScatterCard title="Month wise Views Trend" />
          </Grid>
        </Grid>
        <Grid item container xs={12} spacing={3} style={{ paddingLeft: 0 }}>
          <Grid item xs={6}>
            <TrendCard />
          </Grid>
          <Grid item xs={4}>
            <DoughnutCard />
          </Grid>
          <Grid item xs={2}>
            <InfoCard
              content="122"
              inference={1}
              message="Retweets per thousand views"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
