import snscrape.modules.twitter as sntwitter

query = "(@elonmusk) min_replies:99 min_faves:100 min_retweets:100"


def get_tweet_likes():
    tweet = next(sntwitter.TwitterSearchScraper(query).get_items())
    return tweet.likeCount
