import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import leaves_1 from "../../../Assets/Leaves_1.png";
import leaves_2 from "../../../Assets/Leaves_2.png";
import { NavBar } from "../../navbar";
import NewQueryButton from "../../fab";
import ProfileCard from "./profileCard";
import InfoTrendCard from "./infoTrendCard";
import ScatterCard from "./ScatterCard";
import TrendCard from "./trendCard";
import InfoCard from "./infoCard";
import RadarCard from "../SentimentDashboard/radarCard";
import { PreLoad } from "./loadingScreen";
import { indexOfMax, isEmpty } from "../../../utils/utils";

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

export const BasicDashboard = ({ handle, data, message }) => {
  const classes = useStyles();
  return (
    <>
      {isEmpty(data) ? (
        <PreLoad message={message} />
      ) : (
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
                  title="Avg. Views"
                  content={data["views_trend"]["mean"]}
                  inference={data["views_trend"]["inference"]}
                  data={data["views_trend"]["trend"]}
                />
              </Grid>
              <Grid item xs={4}>
                <InfoTrendCard
                  title="Avg. Likes"
                  content={data["likes_trend"]["mean"]}
                  inference={data["likes_trend"]["inference"]}
                  data={data["likes_trend"]["trend"]}
                />
              </Grid>
              <Grid item xs={4}>
                <InfoTrendCard
                  title="Avg. Retweets"
                  content={data["re_tweets_trend"]["mean"]}
                  inference={data["re_tweets_trend"]["inference"]}
                  data={data["re_tweets_trend"]["trend"]}
                />
              </Grid>
            </Grid>
            <Grid item container xs={12} spacing={3} style={{ paddingLeft: 0 }}>
              <Grid item xs={10}>
                <TrendCard
                  data={[data["followers_trend"]]}
                  label_set={["Followers"]}
                  title={"Followers Trend over Time"}
                  x_label={"Time measured in Tweets"}
                  y_label={"Followers"}
                />
              </Grid>
              <Grid item xs={2}>
                <InfoCard
                  content={data["fpt"]["fpt"]}
                  inference={data["fpt"]["inference"]}
                  message="Followers Per Tweet"
                />
              </Grid>
            </Grid>
            <Grid item container xs={12} spacing={3} style={{ paddingLeft: 0 }}>
              <Grid item container xs={2} spacing={3} alignContent="flex-start">
                <Grid item xs={12}>
                  <InfoCard
                    content={data["likes_vs_views"]["likes per view"]}
                    inference={data["likes_vs_views"]["inference"]}
                    message="Likes per thousand views"
                  />
                </Grid>
                <Grid item xs={12}>
                  <InfoCard
                    content={data["retweets_vs_views"]["retweets per view"]}
                    inference={data["retweets_vs_views"]["inference"]}
                    message="Retweets per thousand views"
                  />
                </Grid>
              </Grid>
              <Grid item xs={5}>
                <ScatterCard
                  title="Likes Vs Views"
                  label="Likes | Views"
                  data_x={data["likes_vs_views"]["x"]}
                  data_y={data["likes_vs_views"]["y"]}
                  x_label={"Views"}
                  y_label={"Likes"}
                />
              </Grid>
              <Grid item xs={5}>
                <ScatterCard
                  title="Retweets Vs Views"
                  label="Retweets | Views"
                  data_x={data["retweets_vs_views"]["x"]}
                  data_y={data["retweets_vs_views"]["y"]}
                  x_label={"Views"}
                  y_label={"Retweets"}
                />
              </Grid>
            </Grid>
            <Grid item container xs={12} spacing={3} style={{ paddingLeft: 0 }}>
              <Grid item xs={6}>
                <RadarCard
                  labels={[
                    "Midnight (00 - 04 hours)",
                    "Early Morning (04 - 08 hours)",
                    "Morning (08 - 12 hours)",
                    "Afternoon (12 - 16 hours)",
                    "Evening (16 - 20 hours)",
                    "Night (20 - 00 hours)",
                  ]}
                  secondary_labels={["views", "likes", "retweets"]}
                  data={[
                    data["time_trends"]["segments"]["views"],
                    data["time_trends"]["segments"]["likes"],
                    data["time_trends"]["segments"]["retweets"],
                  ]}
                  size={60}
                  title={"Aggregate Time Trend Analysis"}
                />
              </Grid>
              <Grid item container xs={6} spacing={3} alignContent="flex-start">
                <Grid item xs={12}>
                  <InfoCard
                    content={
                      [
                        "Midnight",
                        "Early Morning",
                        "Morning",
                        "Afternoon",
                        "Evening",
                        "Night",
                      ][
                        indexOfMax([
                          data["time_trends"]["segments"]["views"],
                          data["time_trends"]["segments"]["likes"],
                          data["time_trends"]["segments"]["retweets"],
                        ])
                      ]
                    }
                    inference={1}
                    message="Is the best time to tweet"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TrendCard
                    data={[
                      data["time_trends"]["views"],
                      data["time_trends"]["likes"],
                      data["time_trends"]["retweets"],
                    ]}
                    label_set={["Views", "Likes", "Retweets"]}
                    title={"Hourly Trend Analysis"}
                    x_label={"Time in Hours"}
                    y_label={"Views | Likes | Retweets"}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};
