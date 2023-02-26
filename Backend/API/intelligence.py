import numpy as np
import pandas
import pandas as pd
from messenger import write_msg
import collector
import datetime
import re
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import text2emotion as te


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
        self.dates = None
        self.all_null = []

    @staticmethod
    def scale_vector(vec):
        mx = max(vec) or 1
        return list(map(lambda elem: elem / mx, vec))

    def preprocess(self):
        self.df["date"] = pd.to_datetime(self.df["date"])
        self.dates = self.df["date"]
        self.df["Year"] = self.df["date"].dt.year
        self.df["Month"] = self.df["date"].dt.month
        self.df["Day"] = self.df["date"].dt.day
        self.df["Time"] = self.df["date"].dt.hour
        self.df.drop("date", inplace=True, axis=1)
        nan_ = self.df.columns[self.df.isna().any()].tolist()
        for i in nan_:
            if self.df.loc[:, i].isnull().all():
                self.all_null.append(i)
                continue
            while self.df.loc[:, i].isnull().sum() != 0:
                self.df.loc[:, i].fillna(
                    np.random.normal(self.df.loc[:, i].mean(), self.df.loc[:, i].std()),
                    limit=1,
                    inplace=True
                )
        write_msg("Preprocessing Complete", "trend")

    def likes_trend(self):
        if "likes" in self.all_null:
            return False
        split = np.array_split(self.df["likes"].dropna(), 10)
        trend = [view.mean() for view in split[::-1]]
        return {
            "trend": trend,
            "mean": sum(trend) / 10,
            "inference": bool(trend[-1] > sum(trend[:-1]) / 9)
        }

    def views_trend(self):
        if "views" in self.all_null:
            return False
        split = np.array_split(self.df["views"].dropna(), 10)
        trend = [view.mean() for view in split[::-1]]
        return {
            "trend": trend,
            "mean": sum(trend) / 10,
            "inference": bool(trend[-1] > sum(trend[:-1]) / 9)
        }

    def re_tweets_trend(self):
        if "retweets" in self.all_null:
            return False
        split = np.array_split(self.df["retweets"].dropna(), 10)
        trend = [view.mean() for view in split[::-1]]
        return {
            "trend": trend,
            "mean": sum(trend) / 10,
            "inference": bool(trend[-1] > sum(trend[:-1]) / 9)
        }

    def followers_trend(self):
        if "followers" in self.all_null:
            return False
        split = np.array_split(self.df["followers"].dropna(), 40)
        return [view.mean() for view in split]

    def followers_per_tweet(self):
        if "followers" in self.all_null:
            return False
        fpt = round((self.df["followers"].iloc[-1] - self.df["followers"].iloc[0]) / self.collector.collected, 1)
        return {
            "fpt": fpt,
            "inference": bool(fpt > 0)
        }

    def likes_vs_views(self):
        if "likes" in self.all_null or "views" in self.all_null:
            return False
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
        if "retweets" in self.all_null or "views" in self.all_null:
            return False
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
        numeric_columns = [i for i in ["views", "likes", "retweets"] if i not in self.all_null]
        time_frame = self.df.groupby("Time").mean(numeric_only=True).loc[:, numeric_columns]
        return {
            "views": self.scale_vector(time_frame["views"].values.tolist()) if "views" not in self.all_null else False,
            "likes": self.scale_vector(time_frame["likes"].values.tolist()) if "likes" not in self.all_null else False,
            "retweets": self.scale_vector(
                time_frame["retweets"].values.tolist()) if "retweets" not in self.all_null else False,
            "segments": {
                "views": self.scale_vector([0 if np.isnan(value) else value for value in [
                    time_frame.iloc[:4, :]["views"].values.mean(),
                    time_frame.iloc[4: 8, :]["views"].values.mean(),
                    time_frame.iloc[8: 12, :]["views"].values.mean(),
                    time_frame.iloc[12: 16, :]["views"].values.mean(),
                    time_frame.iloc[16: 20, :]["views"].values.mean(),
                    time_frame.iloc[20:, :]["views"].values.mean(),
                ]]) if "views" not in self.all_null else False,
                "likes": self.scale_vector([0 if np.isnan(value) else value for value in [
                    time_frame.iloc[:4, :]["likes"].values.mean(),
                    time_frame.iloc[4: 8, :]["likes"].values.mean(),
                    time_frame.iloc[8: 12, :]["likes"].values.mean(),
                    time_frame.iloc[12: 16, :]["likes"].values.mean(),
                    time_frame.iloc[16: 20, :]["likes"].values.mean(),
                    time_frame.iloc[20:, :]["likes"].values.mean(),
                ]]) if "likes" not in self.all_null else False,
                "retweets": self.scale_vector([0 if np.isnan(value) else value for value in [
                    time_frame.iloc[:4, :]["retweets"].values.mean(),
                    time_frame.iloc[4: 8, :]["retweets"].values.mean(),
                    time_frame.iloc[8: 12, :]["retweets"].values.mean(),
                    time_frame.iloc[12: 16, :]["retweets"].values.mean(),
                    time_frame.iloc[16: 20, :]["retweets"].values.mean(),
                    time_frame.iloc[20:, :]["retweets"].values.mean(),
                ]]) if "retweets" not in self.all_null else False,
            },
            "labels": numeric_columns,
        }

    def tweet_span(self):
        # TODO: Fails if there are not enough values.
        span = self.dates.iloc[0] - self.dates.iloc[-1]
        split = np.array_split(self.dates.dropna(), 20)
        trend = [len(value) / ((value.iloc[0] - value.iloc[-1]).days or 1) for value in split[::-1]]
        return {
            "span": span.days,
            "avg": self.collector.collected / span.days,
            "trend": trend,
            "inference": bool(trend[-1] > sum(trend[:-1]) / 19)
        }

    def analysis_json(self):
        if self.collector.collected < 200:
            return {
                "analysis": False,
            }
        write_msg("Preprocessing Handle Tweets", "trend")
        self.preprocess()
        return {
            "analysis": True,
            "span": self.tweet_span(),
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
    def __init__(
            self,
            handle: str,
            min_faves: int = 20,
            since: str = "2015-01-01",
            until: str = str(datetime.date.today()),
    ):
        self.collector = collector.CommentsTweetsCollector(
            handle,
            min_faves,
            since,
            until,
        )
        self.tweets = self.collector.collect_tweets()
        self.df = pd.DataFrame(
            self.tweets,
            columns=[
                "username",
                "followers",
                "date",
                "content",
                "replies",
                "likes",
                "retweets",
                "views",
            ]
        )
        self.all_null = []

    @staticmethod
    def scale_vector(vec):
        mx = max(vec) or 1
        return list(map(lambda elem: elem / mx, vec))

    @staticmethod
    def _pp_text(text):
        # Remove links
        text = re.sub('http://\S+|https://\S+', '', text)
        text = re.sub('http[s]?://\S+', '', text)
        text = re.sub(r"http\S+", "", text)
        # Convert HTML references
        text = re.sub('&amp', 'and', text)
        text = re.sub('&lt', '<', text)
        text = re.sub('&gt', '>', text)
        # Remove new line characters
        text = re.sub('[\r\n]+', ' ', text)
        # Remove mentions
        text = re.sub(r'@\w+', '', text)
        # Remove hashtags
        text = re.sub(r'#\w+', '', text)
        # Remove multiple space characters
        text = re.sub('\s+', ' ', text)
        # Convert to lowercase
        return text.lower()

    def preprocess(self):
        write_msg("Preprocessing Comment Tweets", "sentiment")
        # Preprocess Dates
        self.df["date"] = pd.to_datetime(self.df["date"])
        self.df["Year"] = self.df["date"].dt.year
        self.df["Month"] = self.df["date"].dt.month
        self.df["Day"] = self.df["date"].dt.day
        self.df["Time"] = self.df["date"].dt.hour
        self.df.drop("date", inplace=True, axis=1)

        # Preprocess Null Values
        nan_ = self.df.columns[self.df.isna().any()].tolist()
        for i in nan_:
            if self.df.loc[:, i].isnull().all():
                self.all_null.append(i)
                continue
            while self.df.loc[:, i].isnull().sum() != 0:
                self.df.loc[:, i].fillna(
                    np.random.normal(self.df.loc[:, i].mean(), self.df.loc[:, i].std()),
                    limit=1,
                    inplace=True
                )

        # Preprocess Text
        self.df["content"] = self.df["content"].apply(self._pp_text)
        write_msg("Preprocessing Complete", "sentiment")

    def _add_sentiment(self):
        write_msg("Performing Sentiment Analysis", "sentiment")
        sent = SentimentIntensityAnalyzer()
        polarity, emotion, count, total = [], [], 0, self.collector.collected
        for content in self.df["content"].values:
            polarity.append(sent.polarity_scores(content))
            emotion.append(te.get_emotion(content))
            write_msg(f"Analysing Tweet Polarity and Emotion: {round(count / total * 100, 2)}%", "sentiment")
            count += 1
        pdf = pandas.DataFrame(polarity)
        edf = pandas.DataFrame(emotion)
        self.df = pd.concat([self.df, pdf, edf], axis=1)
        write_msg("Sentiment Analysis Complete", "sentiment")

    def positive_trend(self):
        if "pos" in self.all_null:
            return False
        split = np.array_split(self.df["pos"].dropna(), 10)
        trend = [view.mean() for view in split[::-1]]
        return {
            "trend": trend,
            "mean": sum(trend) / 10,
            "inference": bool(trend[-1] > sum(trend[:-1]) / 9)
        }

    def negative_trend(self):
        if "neg" in self.all_null:
            return False
        split = np.array_split(self.df["neg"].dropna(), 10)
        trend = [view.mean() for view in split[::-1]]
        return {
            "trend": trend,
            "mean": sum(trend) / 10,
            "inference": bool(trend[-1] > sum(trend[:-1]) / 9)
        }

    def neutral_trend(self):
        if "neu" in self.all_null:
            return False
        split = np.array_split(self.df["neu"].dropna(), 10)
        trend = [view.mean() for view in split[::-1]]
        return {
            "trend": trend,
            "mean": sum(trend) / 10,
            "inference": bool(trend[-1] > sum(trend[:-1]) / 9)
        }

    def polarity_distribution(self):
        polarity = [
            "positive",
            "negative",
        ]
        trend = [round(self.df[pol[:3]].mean(), 2) for pol in polarity]
        index_max = max(range(2), key=trend.__getitem__)
        return {
            "labels": polarity,
            "trend": trend,
            "dominant_polarity": polarity[index_max],
            "percentage": round(trend[index_max] / sum(trend) * 100),
            "inference": int(index_max) != 1,
        }

    def emotion_distribution(self):
        emotions = [
            "Happy",
            "Surprise",
            "Sad",
            "Angry",
            "Fear"
        ]
        trend = [round(self.df[emotion].mean(), 2) for emotion in emotions]
        index_max = max(range(5), key=trend.__getitem__)
        return {
            "labels": emotions,
            "trend": trend,
            "dominant_emotion": emotions[index_max],
            "percentage": round(trend[index_max] / sum(trend) * 100),
            "inference": int(index_max) < 2
        }

    def analysis_json(self):
        if self.collector.collected < 200:
            return {
                "analysis": False,
            }
        self.preprocess()
        self._add_sentiment()
        return {
            "analysis": True,
            "positive_trend": self.positive_trend(),
            "negative_trend": self.negative_trend(),
            "neutral_trend": self.neutral_trend(),
            "polarity_distribution": self.polarity_distribution(),
            "emotion_distribution": self.emotion_distribution(),
        }
