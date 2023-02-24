import numpy as np
import pandas as pd
from messenger import write_msg
import collector
import datetime


class TrendIntelligence:
    def __init__(
            self,
            handle: str,
            min_replies: int = 0,
            min_faves: int = 0,
            min_retweets: int = 0,
            since: str = "2015-01-01",
            until: str = str(datetime.date.today()),
    ):
        self.collector = collector.HandleTweetsCollector(
            handle,
            min_replies,
            min_faves,
            min_retweets,
            since,
            until,
        )
        self.tweets = self.collector.collect_tweets()
        self.df = pd.DataFrame(
            self.tweets,
            columns=[
                "username",
                "followers",
                "friends",
                "favourites",
                "date",
                "replies",
                "likes",
                "retweets",
                "quotes",
                "views",
            ]
        )
        write_msg("Preprocessing Handle Tweets")
        self.preprocess()

    @staticmethod
    def scale_vector(vec):
        mx = max(vec) or 1
        return list(map(lambda elem: elem / mx, vec))

    def preprocess(self):
        self.df["date"] = pd.to_datetime(self.df["date"])
        self.df["Year"] = self.df["date"].dt.year
        self.df["Month"] = self.df["date"].dt.month
        self.df["Day"] = self.df["date"].dt.day
        self.df["Time"] = self.df["date"].dt.hour
        self.df.drop("date", inplace=True, axis=1)
        self.df.fillna(self.df.median(numeric_only=True), inplace=True)
        write_msg("Preprocessing Complete")

    def likes_trend(self):
        split = np.array_split(self.df["likes"].dropna(), 10)
        trend = [view.mean() for view in split[::-1]]
        return {
            "trend": trend,
            "mean": sum(trend) / 10,
            "inference": bool(trend[-1] > sum(trend[:-1]) / 9)
        }

    def views_trend(self):
        split = np.array_split(self.df["views"].dropna(), 10)
        trend = [view.mean() for view in split[::-1]]
        return {
            "trend": trend,
            "mean": sum(trend) / 10,
            "inference": bool(trend[-1] > sum(trend[:-1]) / 9)
        }

    def re_tweets_trend(self):
        split = np.array_split(self.df["retweets"].dropna(), 10)
        trend = [view.mean() for view in split[::-1]]
        return {
            "trend": trend,
            "mean": sum(trend) / 10,
            "inference": bool(trend[-1] > sum(trend[:-1]) / 9)
        }

    def followers_trend(self):
        split = np.array_split(self.df["followers"].dropna(), 40)
        return [view.mean() for view in split]

    def followers_per_tweet(self):
        fpt = round((self.df["followers"].iloc[-1] - self.df["followers"].iloc[0]) / self.collector.collected, 1)
        return {
            "fpt": fpt,
            "inference": bool(fpt > 0)
        }

    def likes_vs_views(self):
        split_x = np.array_split(self.df["views"].dropna(), 50)
        split_y = np.array_split(self.df["likes"].dropna(), 50)
        x = [view.mean() for view in split_x[::-1]]
        y = [view.mean() for view in split_y[::-1]]
        return {
            "x": x,
            "y": y,
            "likes per view": self.df["likes"].mean() / self.df["views"].mean() * 1000,
            "inference": bool(x[-1] / y[-1] > sum(x[:-1]) / sum(y[:-1]))
        }

    def retweets_vs_views(self):
        split_x = np.array_split(self.df["views"].dropna(), 50)
        split_y = np.array_split(self.df["retweets"].dropna(), 50)
        x = [view.mean() for view in split_x[::-1]]
        y = [view.mean() for view in split_y[::-1]]
        return {
            "x": x,
            "y": y,
            "retweets per view": self.df["retweets"].mean() / self.df["views"].mean() * 1000,
            "inference": bool(x[-1] / y[-1] > sum(x[:-1]) / sum(y[:-1]))
        }

    def time_trends(self):
        time_frame = self.df.groupby("Time").mean(numeric_only=True).loc[:, ["views", "likes", "retweets"]]
        time_frame.fillna(time_frame.mean(), inplace=True)
        return {
            "views": self.scale_vector(time_frame["views"].values.tolist()),
            "likes": self.scale_vector(time_frame["likes"].values.tolist()),
            "retweets": self.scale_vector(time_frame["retweets"].values.tolist()),
            "segments": {
                "views": self.scale_vector([0 if np.isnan(value) else value for value in [
                    time_frame.iloc[:4, :]["views"].values.mean(),
                    time_frame.iloc[4: 8, :]["views"].values.mean(),
                    time_frame.iloc[8: 12, :]["views"].values.mean(),
                    time_frame.iloc[12: 16, :]["views"].values.mean(),
                    time_frame.iloc[16: 20, :]["views"].values.mean(),
                    time_frame.iloc[20:, :]["views"].values.mean(),
                ]]),
                "likes": self.scale_vector([0 if np.isnan(value) else value for value in [
                    time_frame.iloc[:4, :]["likes"].values.mean(),
                    time_frame.iloc[4: 8, :]["likes"].values.mean(),
                    time_frame.iloc[8: 12, :]["likes"].values.mean(),
                    time_frame.iloc[12: 16, :]["likes"].values.mean(),
                    time_frame.iloc[16: 20, :]["likes"].values.mean(),
                    time_frame.iloc[20:, :]["likes"].values.mean(),
                ]]),
                "retweets": self.scale_vector([0 if np.isnan(value) else value for value in [
                    time_frame.iloc[:4, :]["retweets"].values.mean(),
                    time_frame.iloc[4: 8, :]["retweets"].values.mean(),
                    time_frame.iloc[8: 12, :]["retweets"].values.mean(),
                    time_frame.iloc[12: 16, :]["retweets"].values.mean(),
                    time_frame.iloc[16: 20, :]["retweets"].values.mean(),
                    time_frame.iloc[20:, :]["retweets"].values.mean(),
                ]]),
            }
        }

    def analysis_json(self):
        return {
            "likes_trend": self.likes_trend(),
            "views_trend": self.views_trend(),
            "re_tweets_trend": self.re_tweets_trend(),
            "followers_trend": self.followers_trend(),
            "fpt": self.followers_per_tweet(),
            "likes_vs_views": self.likes_vs_views(),
            "retweets_vs_views": self.retweets_vs_views(),
            "time_trends": self.time_trends(),
        }


class SentimentIntelligence:
    def __init__(self):
        ...
