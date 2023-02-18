import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import leaves_1 from "../Assets/Leaves_1.png";
import leaves_2 from "../Assets/Leaves_2.png";
import heroSectionIllustration from "../Assets/Hero Section Illustration.png";
import backgroundHighlightImage from "../Assets/Background shade.png";
import { NavBar } from "./navbar";
import { Button, Typography } from "@mui/material";
import MainInput from "./application/input";
import Filters from "./application/filters";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  homePage: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#B5E3FF",
  },
  heroSection: {
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
  backgroundEffect3: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    zIndex: 0,
  },
  HSImageContainer: {
    display: "flex",
    height: "100%",
    alignContent: "center",
    alignItems: "center",
  },
  HSTextContainer: {
    display: "flex",
    height: "100%",
    alignContent: "center",
  },
  HSPrimaryText: {
    fontFamily: "outfit !important",
    fontWeight: "bold !important",
    fontSize: "4rem !important",
  },
  HSHighlight: {
    color: "#6A70FF",
  },
  HSSecondaryText: {
    fontFamily: "roboto !important",
    fontWeight: "normal !important",
    fontSize: "2rem !important",
    color: "#3F3D56 !important",
  },
  HSPrimaryButton: {
    borderRadius: "500px !important",
    backgroundColor: "#FF6685 !important",
    color: "white !important",
    marginRight: "1rem !important",
    fontSize: "1rem !important",
  },
  HSSecondaryButton: {
    border: "2px solid #3F3D56 !important",
    borderRadius: "500px !important",
    color: "#3F3D56 !important",
    fontSize: "1rem !important",
  },
}));

export const HomePage = (props) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.homePage}>
      <img src={leaves_1} alt="" className={classes.backgroundEffect1} />
      <img src={leaves_2} alt="" className={classes.backgroundEffect2} />
      <img
        src={backgroundHighlightImage}
        alt=""
        className={classes.backgroundEffect3}
      />
      <Filters open={props.filterOpen} />
      <NavBar />
      <Grid item container xs={9} className={classes.heroSection}>
        <Grid item container xs={6} className={classes.HSTextContainer}>
          <Grid item xs={12}>
            <Typography variant="h1" className={classes.HSPrimaryText}>
              Know what <span className={classes.HSHighlight}>#People</span> are
              saying about you
            </Typography>
            <Typography variant="body1" className={classes.HSSecondaryText}>
              Powered by <span className={classes.HSHighlight}>#AI</span>{" "}
              working for you.
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ marginTop: "5rem" }}>
            <MainInput
              placeHolderText="Enter @mention or #hashtag"
              width={90}
            />
          </Grid>
        </Grid>
        <Grid item xs={6} className={classes.HSImageContainer}>
          <img src={heroSectionIllustration} alt={"hero section"} />
        </Grid>
      </Grid>
    </Grid>
  );
};
