import numpy as np
import pandas
import pandas as pd
from messenger import write_msg
import collector
import datetime
import re
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import text2emotion as te
import nltk
from nltk.corpus import stopwords


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
        write_msg("Preprocessing Complete", "trend", progress=0)

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
        write_msg("Preprocessing Handle Tweets", "trend", progress=0)
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
        nltk.download("stopwords")
        nltk.download("wordnet")
        nltk.download('omw-1.4')
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
        write_msg("Preprocessing Comment Tweets", "sentiment", progress=0)
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
        write_msg("Preprocessing Complete", "sentiment", progress=0)

    def _add_sentiment(self):
        write_msg("Performing Sentiment Analysis", "sentiment", progress=0)
        sent = SentimentIntensityAnalyzer()
        polarity, emotion, count, total = [], [], 0, self.collector.collected
        for content in self.df["content"].values:
            polarity.append(sent.polarity_scores(content))
            emotion.append(te.get_emotion(content))
            write_msg(f"Determining Tweet Polarity and Emotion", "sentiment", progress=round(count / total * 100, 2))
            count += 1
        pdf = pandas.DataFrame(polarity)
        edf = pandas.DataFrame(emotion)
        self.df = pd.concat([self.df, pdf, edf], axis=1)
        write_msg("Sentiment Analysis Complete", "sentiment", progress=100)

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
            "Angry",
            "Sad",
            "Surprise",
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

    def time_trends(self):
        numeric_columns = [i for i in ["Happy", "Angry", "Sad", "Surprise", "Fear", "pos", "neg"] if
                           i not in self.all_null]
        time_frame = self.df.groupby("Time").mean(numeric_only=True).loc[:, numeric_columns]
        return {
            "polarity": {
                "Positive": self.scale_vector([0 if np.isnan(value) else value for value in [
                    time_frame.iloc[:4, :]["pos"].values.mean(),
                    time_frame.iloc[4: 8, :]["pos"].values.mean(),
                    time_frame.iloc[8: 12, :]["pos"].values.mean(),
                    time_frame.iloc[12: 16, :]["pos"].values.mean(),
                    time_frame.iloc[16: 20, :]["pos"].values.mean(),
                    time_frame.iloc[20:, :]["pos"].values.mean(),
                ]]) if "pos" not in self.all_null else False,
                "Negative": self.scale_vector([0 if np.isnan(value) else value for value in [
                    time_frame.iloc[:4, :]["neg"].values.mean(),
                    time_frame.iloc[4: 8, :]["neg"].values.mean(),
                    time_frame.iloc[8: 12, :]["neg"].values.mean(),
                    time_frame.iloc[12: 16, :]["neg"].values.mean(),
                    time_frame.iloc[16: 20, :]["neg"].values.mean(),
                    time_frame.iloc[20:, :]["neg"].values.mean(),
                ]]) if "neg" not in self.all_null else False,
            },
            "emotions": {
                "Happy": self.scale_vector([0 if np.isnan(value) else value for value in [
                    time_frame.iloc[:4, :]["Happy"].values.mean(),
                    time_frame.iloc[4: 8, :]["Happy"].values.mean(),
                    time_frame.iloc[8: 12, :]["Happy"].values.mean(),
                    time_frame.iloc[12: 16, :]["Happy"].values.mean(),
                    time_frame.iloc[16: 20, :]["Happy"].values.mean(),
                    time_frame.iloc[20:, :]["Happy"].values.mean(),
                ]]) if "Happy" not in self.all_null else False,
                "Surprise": self.scale_vector([0 if np.isnan(value) else value for value in [
                    time_frame.iloc[:4, :]["Surprise"].values.mean(),
                    time_frame.iloc[4: 8, :]["Surprise"].values.mean(),
                    time_frame.iloc[8: 12, :]["Surprise"].values.mean(),
                    time_frame.iloc[12: 16, :]["Surprise"].values.mean(),
                    time_frame.iloc[16: 20, :]["Surprise"].values.mean(),
                    time_frame.iloc[20:, :]["Surprise"].values.mean(),
                ]]) if "Surprise" not in self.all_null else False,
                "Angry": self.scale_vector([0 if np.isnan(value) else value for value in [
                    time_frame.iloc[:4, :]["Angry"].values.mean(),
                    time_frame.iloc[4: 8, :]["Angry"].values.mean(),
                    time_frame.iloc[8: 12, :]["Angry"].values.mean(),
                    time_frame.iloc[12: 16, :]["Angry"].values.mean(),
                    time_frame.iloc[16: 20, :]["Angry"].values.mean(),
                    time_frame.iloc[20:, :]["Angry"].values.mean(),
                ]]) if "Angry" not in self.all_null else False,
                "Sad": self.scale_vector([0 if np.isnan(value) else value for value in [
                    time_frame.iloc[:4, :]["Sad"].values.mean(),
                    time_frame.iloc[4: 8, :]["Sad"].values.mean(),
                    time_frame.iloc[8: 12, :]["Sad"].values.mean(),
                    time_frame.iloc[12: 16, :]["Sad"].values.mean(),
                    time_frame.iloc[16: 20, :]["Sad"].values.mean(),
                    time_frame.iloc[20:, :]["Sad"].values.mean(),
                ]]) if "Sad" not in self.all_null else False,
                "Fear": self.scale_vector([0 if np.isnan(value) else value for value in [
                    time_frame.iloc[:4, :]["Fear"].values.mean(),
                    time_frame.iloc[4: 8, :]["Fear"].values.mean(),
                    time_frame.iloc[8: 12, :]["Fear"].values.mean(),
                    time_frame.iloc[12: 16, :]["Fear"].values.mean(),
                    time_frame.iloc[16: 20, :]["Fear"].values.mean(),
                    time_frame.iloc[20:, :]["Fear"].values.mean(),
                ]]) if "Fear" not in self.all_null else False,
            },
            "emotion_labels": numeric_columns[:5],
            "polarity_labels": ["Positive", "Negative"],
        }

    def commenter_trends(self):
        self.df["lpv"] = self.df["likes"] / self.df["views"]
        by_commenter = self.df.sort_values(by="lpv", ascending=False)
        top_3 = by_commenter["username"].iloc[:3]
        return {
            i: [
                0 if np.isnan(value) else value for value in
                by_commenter.loc[by_commenter["username"] == i]
                .loc[:, ["Happy", "Angry", "Surprise", "Sad", "Fear", "pos", "neg"]].mean().values
            ]
            for i in top_3
        }

    def top_words(self):
        sw = nltk.corpus.stopwords.words("english")
        words = ''.join(str(self.df["content"].tolist()))
        words = re.sub(r'[^\w\s]', '', words).split()
        wnl = nltk.stem.WordNetLemmatizer()
        words = [wnl.lemmatize(word) for word in words if word not in sw]
        return {
            "t10_words": list(i[0] for i in pd.Series(nltk.ngrams(words, 1)).value_counts().iloc[:10].keys()),
            "t10_word_counts": list(int(i) for i in pd.Series(nltk.ngrams(words, 1)).value_counts().iloc[:10].values),
            "t10_bigrams": list(i[0] + " " + i[1] for i in pd.Series(nltk.ngrams(words, 2)).value_counts().iloc[:10]
                                .keys()),
            "t10_bigram_counts": list(int(i) for i in pd.Series(nltk.ngrams(words, 2)).value_counts().iloc[:10].values)
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
            "time_trends": self.time_trends(),
            "commenter_trends": self.commenter_trends(),
            "word_trends": self.top_words(),
        }
