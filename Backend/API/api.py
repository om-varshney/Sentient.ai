import json
from flask import Flask, request
import interface

app = Flask(__name__)


@app.route('/message_trend')
def get_trend_status():
    return {'message': open("status_trend.txt").read()}


@app.route('/message_sentiment')
def get_sentiment_status():
    return {'message': open("status_sentiment.txt").read()}


@app.route('/trends', methods=["POST"])
def get_trend_data():
    handle = request.json
    if handle:
        return interface.get_trend_data(handle)
    return app.response_class(
        response=json.dumps({}),
        status=404,
        mimetype='application/json'
    )


@app.route('/sentiment', methods=["POST"])
def get_sentiment_data():
    handle = request.json
    if handle:
        return interface.get_sentiment_data(handle)
    return app.response_class(
        response=json.dumps({}),
        status=404,
        mimetype='application/json'
    )
