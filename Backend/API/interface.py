"""
This file will act as the interface for our application. It will connect the applications API to the backend processing
units. It will handle and distribute all requests.
"""
import intelligence


def get_trend_data(handle):
    return intelligence.TrendIntelligence(handle).analysis_json()


if __name__ == "__main__":
    print(get_trend_data("@_SuccessMinded_"))
