import json
from flask import Flask, request
import interface

app = Flask(__name__)


@app.route('/message')
def get_trend_status():
    return {'message': open("status.txt").read()}


@app.route('/trends', methods=["POST"])
def get_trend_data():
    handle = request.json
    print("handle", handle)
    if handle:
        return interface.get_trend_data(handle)
    return app.response_class(
        response=json.dumps({}),
        status=404,
        mimetype='application/json'
    )

