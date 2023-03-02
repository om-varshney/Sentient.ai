import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import leaves_1 from "../../../Assets/Leaves_1.png";
import leaves_2 from "../../../Assets/Leaves_2.png";
import { NavBar } from "../../navbar";
import NewQueryButton from "../../fab";
import DoughnutCard from "./doughnutCard";
import ChartCard from "./chartCard";
import RadarCard from "./radarCard";
import ProfileCard from "../basicDashboard/profileCard";
import { PreLoad } from "../loadingScreen";
import { indexOfMax, isEmpty } from "../../../utils/utils";
import InfoTrendCard from "../basicDashboard/infoTrendCard";
import InfoCard from "../basicDashboard/infoCard";
import { InvalidAccount } from "../invalidAccountScreen";

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
        <PreLoad content={message.msg} progress={message.value} />
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
              <Grid item xs={6}>
                <DoughnutCard
                  data={data["emotion_distribution"]["trend"]}
                  labels={data["emotion_distribution"]["labels"]}
                  secondaryLabel={"Emotion"}
                  title={"Emotion distribution in comments"}
                />
              </Grid>
              <Grid item xs={4}>
                <DoughnutCard
                  data={data["polarity_distribution"]["trend"]}
                  labels={data["polarity_distribution"]["labels"]}
                  secondaryLabel={"Polarity"}
                  title={"Polarity distribution in comments"}
                />
              </Grid>
              <Grid item container xs={2} spacing={3} alignContent="flex-start">
                <Grid item xs={12}>
                  <InfoCard
                    content={
                      data["polarity_distribution"]
                        ? data["polarity_distribution"]["percentage"] + "%"
                        : "--"
                    }
                    inference={data["polarity_distribution"]["inference"]}
                    message={
                      data["polarity_distribution"]
                        ? `People show ${data["polarity_distribution"]["dominant_polarity"]} polarity to your tweets`
                        : "Data Unavailable"
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <InfoCard
                    content={
                      data["emotion_distribution"]
                        ? data["emotion_distribution"]["percentage"] + "%"
                        : "--"
                    }
                    inference={data["emotion_distribution"]["inference"]}
                    message={
                      data["emotion_distribution"]
                        ? `People show ${data["emotion_distribution"]["dominant_emotion"]} emotion to your tweets`
                        : "Data Unavailable"
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item container xs={12} spacing={3} style={{ paddingLeft: 0 }}>
              <Grid item xs={7}>
                <RadarCard
                  labels={[
                    "Midnight (00 - 04 hours)",
                    "Early Morning (04 - 08 hours)",
                    "Morning (08 - 12 hours)",
                    "Afternoon (12 - 16 hours)",
                    "Evening (16 - 20 hours)",
                    "Night (20 - 00 hours)",
                  ]}
                  secondaryLabels={data["time_trends"]["emotion_labels"]}
                  data={[
                    data["time_trends"]["emotions"]["Happy"],
                    data["time_trends"]["emotions"]["Surprise"],
                    data["time_trends"]["emotions"]["Angry"],
                    data["time_trends"]["emotions"]["Sad"],
                    data["time_trends"]["emotions"]["Fear"],
                  ].filter(Boolean)}
                  size={65}
                  title={"Aggregate Time-Emotion Analysis"}
                />
              </Grid>
              <Grid item container xs={5} spacing={3} alignContent="flex-start">
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
                          data["time_trends"]["emotions"]["Happy"],
                          data["time_trends"]["emotions"]["Surprised"],
                        ])
                      ]
                    }
                    inference={1}
                    message="Is the best time to tweet"
                  />
                </Grid>
                <Grid item xs={12}>
                  <ChartCard
                    labels={[
                      "Midnight",
                      "Early Morning",
                      "Morning",
                      "Afternoon",
                      "Evening",
                      "Night",
                    ]}
                    secondaryLabels={data["time_trends"]["polarity_labels"]}
                    data={[
                      data["time_trends"]["polarity"]["Positive"],
                      data["time_trends"]["polarity"]["Negative"],
                    ].filter(Boolean)}
                    title="Polarity vs Time analysis"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item container xs={12} spacing={3} style={{ paddingLeft: 0 }}>
              <Grid item container xs={5} spacing={3}>
                <Grid item xs={12}>
                  <ChartCard
                    labels={data["word_trends"]["t10_words"]}
                    secondaryLabels={["top-words"]}
                    data={[data["word_trends"]["t10_word_counts"]]}
                    title="Top words in Comments"
                  />
                </Grid>
                <Grid item xs={12}>
                  <ChartCard
                    labels={data["word_trends"]["t10_bigrams"]}
                    secondaryLabels={["top-bigrams"]}
                    data={[data["word_trends"]["t10_bigram_counts"]]}
                    title="Top Bi-Grams in comments"
                  />
                </Grid>
              </Grid>
              <Grid
                item
                container
                xs={7}
                spacing={3}
                alignContent={"flex-start"}
              >
                <Grid item xs={12}>
                  <InfoCard
                    content={data["word_trends"]["t10_bigrams"][0]}
                    inference={1}
                    message="is the most frequently used bigram in the comments"
                  />
                </Grid>
                <Grid item xs={12}>
                  <RadarCard
                    labels={[
                      "Happy",
                      "Angry",
                      "Surprise",
                      "Sad",
                      "Fear",
                      "pos",
                      "neg",
                    ]}
                    secondaryLabels={Object.keys(data["commenter_trends"])}
                    data={Object.values(data["commenter_trends"])}
                    size={65}
                    title={"Aggregate Commenter-Emotion Analysis"}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <InvalidAccount handle={handle} />
      )}
    </>
  );
};
