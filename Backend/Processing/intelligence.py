import numpy as np
import pandas as pd
from messenger import write_msg
import collector


class TrendIntelligence:
    def __init__(
            self,
            handle: str,
            min_replies: int = None,
            min_faves: int = None,
            min_retweets: int = None,
            since: str = None,
            until: str = None,
    ):
        self.tweets = collector.HandleTweetsCollector(
            handle,
            min_replies,
            min_faves,
            min_retweets,
            since,
            until,
        )
        self.tweets.collect_tweets()
        self.df = pd.DataFrame(
            self.tweets.tweets,
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

    def preprocess(self):
        self.df["date"] = pd.to_datetime(self.df["date"])
        self.df["Year"] = self.df["date"].dt.year
        self.df["Month"] = self.df["date"].dt.month
        self.df["Day"] = self.df["date"].dt.day
        self.df["Time"] = self.df["date"].dt.hour
        self.df.drop("date", inplace=True, axis=1)
        write_msg("Preprocessing Complete")

    def likes_trend(self):
        split = np.array_split(self.df["likes"].dropna(), 10)
        trend = [view.mean() for view in split[::-1]]
        return trend, trend[0] > sum(trend[1:]) / 9

    def views_trend(self):
        split = np.array_split(self.df["views"].dropna(), 10)
        trend = [view.mean() for view in split[::-1]]
        return trend, trend[0] > sum(trend[1:]) / 9

    def re_tweets_trend(self):
        split = np.array_split(self.df["retweets"].dropna(), 10)
        trend = [view.mean() for view in split[::-1]]
        return trend, trend[0] > sum(trend[1:]) / 9

    def followers_trend(self):
        split = np.array_split(self.df["followers"].dropna(), 40)
        return [view.mean() for view in split[::-1]]

    def followers_per_tweet(self):
        fpt = round((self.df["followers"][-1] - self.df["followers"][0]) / self.tweets.collected, 1)
        return fpt, fpt > 0

    def likes_vs_views(self):
        split_x = np.array_split(self.df["views"].dropna(), 50)
        split_y = np.array_split(self.df["likes"].dropna(), 50)
        return {
            "x": [view.mean() for view in split_x[::-1]],
            "y": [view.mean() for view in split_y[::-1]],
            "likes per view": self.df["likes"].mean() / self.df["views"].mean() * 1000,
            "trend": split_x[0] / split_y[0] > sum(split_x[1:]) / sum(split_y[1:])
        }

    def retweets_vs_views(self):
        split_x = np.array_split(self.df["views"].dropna(), 50)
        split_y = np.array_split(self.df["retweets"].dropna(), 50)
        return {
            "x": [view.mean() for view in split_x[::-1]],
            "y": [view.mean() for view in split_y[::-1]],
            "retweets per view": self.df["retweets"].mean() / self.df["views"].mean() * 1000,
            "trend": split_x[0] / split_y[0] > sum(split_x[1:]) / sum(split_y[1:])
        }

    def time_trends(self):
        time_frame = self.df.groupby("Time").loc[:, "views", "likes", "retweets"]
        time_frame.fillna(time_frame.mean(), inplace=True)
        return {
            "views": time_frame["views"].values,
            "likes": time_frame["likes"].values,
            "retweets": time_frame["retweets"].values,
            "segments": {
                "midnight": time_frame.iloc[:4, :]["views"].values,
                "early morning": time_frame.iloc[4: 8, :]["views"].values,
                "morning": time_frame.iloc[8: 12, :]["views"].values,
                "afternoon": time_frame.iloc[12: 16, :]["views"].values,
                "evening": time_frame.iloc[16: 20, :]["views"].values,
                "night": time_frame.iloc[20:, :]["views"].values,
            }
        }
