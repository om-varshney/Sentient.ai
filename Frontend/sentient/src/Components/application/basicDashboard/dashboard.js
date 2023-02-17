import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import leaves_1 from "../../../Assets/Leaves_1.png";
import leaves_2 from "../../../Assets/Leaves_2.png";
import { NavBar } from "../../navbar";
import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import SideNav from "../sideNav";
import NewQueryButton from "../../fab";

const useStyles = makeStyles((theme) => ({
  dashboard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#B5E3FF",
  },
  dashboardContainer: {
    backgroundColor: "transparent",
    width: "100vw",
    height: "90vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "flex-start",
    zIndex: 1,
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
    <Grid container xs={12} className={classes.dashboard}>
      <img src={leaves_1} alt="" className={classes.backgroundEffect1} />
      <img src={leaves_2} alt="" className={classes.backgroundEffect2} />
      <NavBar />
      <SideNav />
      <NewQueryButton />
      <Grid item container xs={9} className={classes.dashboardContainer}>
        <Grid item container xs={12}>
          <Grid item xs={6}></Grid>
          <Grid item container xs={6}>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}></Grid>
          </Grid>
        </Grid>
        <Stack></Stack>
      </Grid>
    </Grid>
  );
};
