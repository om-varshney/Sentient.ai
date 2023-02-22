import text2emotion as te
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

sent = SentimentIntensityAnalyzer()


def get_emotion_polarity(tweet):
    emotion = te.get_emotion(tweet)
    polarity = sent.polarity_scores(tweet)
    return [
        emotion.get("Happy"),
        emotion.get("Angry"),
        emotion.get("Surprise"),
        emotion.get("Sad"),
        emotion.get("Fear"),
        polarity.get("pos"),
        polarity.get("neg"),
        polarity.get("neu"),
    ]
