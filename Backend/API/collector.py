import snscrape.modules.twitter as snt
from messenger import write_msg
import datetime


class HandleTweetsCollector:
    def __init__(
            self,
            handle: str,
            min_replies: int = 0,
            min_faves: int = 0,
            min_retweets: int = 0,
            since: str = "2015-01-01",
            until: str = str(datetime.date.today()),
    ):
        if handle[0] == "@" or "#":
            self.handle = handle
        else:
            self.handle = "@" + handle
        self.min_replies = min_replies
        self.min_faves = min_faves
        self.min_retweets = min_retweets
        self.since = since
        self.until = until
        self.status = "Handle Tweet collector Initialized"
        self.limit = 500
        self.collected = 0
        write_msg(self.status, "trend")

    def build_query(self):
        return f"(from:{self.handle}) -filter:replies " \
               f"min_replies:{self.min_replies} min_faves:{self.min_faves} " \
               f"min_retweets:{self.min_retweets} since:{self.since} until:{self.until}"

    def collect_tweets(self):
        query = self.build_query()
        tweets = []
        for tweet in snt.TwitterSearchScraper(query).get_items():
            if self.collected == self.limit:
                self.status = "Handle Tweets Extracted"
                write_msg(self.status, "trend")
                break
            tweets.append([
                tweet.user.username,
                tweet.user.followersCount,
                tweet.user.friendsCount,
                tweet.user.favouritesCount,
                tweet.date,
                tweet.replyCount,
                tweet.likeCount,
                tweet.retweetCount,
                tweet.quoteCount,
                tweet.viewCount
            ])
            self.collected += 1
            write_msg(f"Tweets Collected: {round(self.collected / self.limit * 100, 2)}%", "trend")
        return tweets


class CommentsTweetsCollector:
    def __init__(
            self,
            handle: str,
            min_faves: int = 100,
            since: str = "2015-01-01",
            until: str = str(datetime.date.today()),
    ):
        self.handle = handle
        self.min_faves = min_faves
        self.since = since
        self.until = until
        self.status = "Comment Tweets Collector Initialized"
        self.limit = 500
        self.collected = 0
        write_msg(self.status, "sentiment")

    def build_query(self):
        return f"(to:{self.handle}) min_faves:{self.min_faves} " \
               f"filter:replies since:{self.since} until:{self.until}"

    def collect_tweets(self):
        query = self.build_query()
        tweets = []
        for tweet in snt.TwitterSearchScraper(query).get_items():
            if self.collected == self.limit:
                self.status = "Comment Tweets Extracted"
                write_msg(self.status, "sentiment")
                break
            tweets.append([
                tweet.user.username,
                tweet.user.followersCount,
                tweet.date,
                tweet.renderedContent,
                tweet.replyCount,
                tweet.likeCount,
                tweet.retweetCount,
                tweet.viewCount,
            ])
            self.collected += 1
            write_msg(f"Comments Collected: {round(self.collected / self.limit * 100, 2)}%", "sentiment")
        return tweets
