import time
from flask import Flask
import basic

app = Flask(__name__)


@app.route('/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/likes')
def get_tweet_likes():
    return {'likes': basic.get_tweet_likes()}
