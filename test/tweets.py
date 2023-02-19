import snscrape.modules.twitter as sntwitter
import text2emotion as te
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import pandas as pd
import time

query = "(@advani_kiara) min_replies:99 min_faves:100 min_retweets:100 until:2020-01-01 since:2010-01-01"
query = "(#CoupleGoals) filter:replies min_faves:10 lang:en"
tweets = []
count = 0
limit = 1
sid_obj = SentimentIntensityAnalyzer()
start = time.time()
for tweet in sntwitter.TwitterSearchScraper(query).get_items():
    if count == limit:
        break
    else:
        print(vars(tweet))
        tweets.append([tweet.date, tweet.user, tweet.rawContent, tweet.likeCount, tweet.quoteCount, tweet.viewCount])
        print(te.get_emotion(tweet.rawContent))
        print(sid_obj.polarity_scores(tweet.rawContent))
        count += 1
end = time.time()
print(end - start)
df = pd.DataFrame(tweets, columns=['Date', 'User', 'Tweet', 'likes', 'quotes', 'views'])
print(df)
