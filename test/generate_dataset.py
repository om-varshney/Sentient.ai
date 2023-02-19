import snscrape.modules.twitter as sntwitter
import text2emotion as te
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import pandas as pd

query_1 = "(from:elonmusk) -filter:replies min_replies:99 min_faves:100 min_retweets:100 since:2015-01-01"
query_2 = "(to:elonmusk) min_faves:100 since:2015-01-01 filter:replies"

TWEETS = []
LIMIT = 500
QUERIES = [query_1, query_2]

sent = SentimentIntensityAnalyzer()

for idx, query in enumerate(QUERIES):
    print(f"Query {idx}")
    COUNT = 0
    TWEETS = []
    for tweet in sntwitter.TwitterSearchScraper(query).get_items():
        if COUNT == LIMIT:
            break
        else:
            emotion = te.get_emotion(tweet.renderedContent)
            polarity = sent.polarity_scores(tweet.renderedContent)
            TWEETS.append(
                [
                    tweet.user.username,
                    tweet.place,
                    tweet.user.followersCount,
                    tweet.user.friendsCount,
                    tweet.user.favouritesCount,
                    tweet.date,
                    tweet.renderedContent,
                    tweet.replyCount,
                    tweet.likeCount,
                    tweet.retweetCount,
                    tweet.quoteCount,
                    tweet.viewCount,
                    emotion.get("Happy"),
                    emotion.get("Angry"),
                    emotion.get("Surprise"),
                    emotion.get("Sad"),
                    emotion.get("Fear"),
                    polarity.get("neg"),
                    polarity.get("neu"),
                    polarity.get("pos"),
                ]
            )
            COUNT += 1
    print("Data Scraped")
    tweet_df = pd.DataFrame(
        TWEETS,
        columns=[
            "Username",
            "Location",
            "User Followers",
            "User Friends",
            "User Favourites",
            "Date",
            "Content",
            "Reply Count",
            "Like Count",
            "Retweet Count",
            "Quote Count",
            "View Count",
            "Happy",
            "Angry",
            "Surprise",
            "Sad",
            "Fear",
            "Neg",
            "Neu",
            "Pos",
        ]
    )
    tweet_df.to_csv(f"query_{idx}.csv")
    print("Dataset Created")
