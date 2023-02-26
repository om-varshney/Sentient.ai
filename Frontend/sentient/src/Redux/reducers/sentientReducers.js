import { ActionTypes } from "../constants/actionTypes";

export const viewChangeReducer = (
  state = { homeState: true, trendDashboard: false, sentimentDashboard: false },
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.SET_VIEW:
      return payload;
    default:
      return state;
  }
};

export const notificationReducer = (
  state = { type: "", msg: "", id: 0 },
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.SET_NOTIFICATION:
      return payload;
    default:
      return state;
  }
};

export const queryReducer = (state = "", { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_QUERY:
      return payload;
    default:
      return state;
  }
};

export const queryFilterViewReducer = (state = false, { type, payload }) => {
  switch (type) {
    case ActionTypes.QUERY_FILTERS_DIALOG:
      return payload;
    default:
      return state;
  }
};

export const trendMessageReducer = (state = "", { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_TREND_MESSAGE:
      return payload;
    default:
      return state;
  }
};

export const trendDataReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_TREND_DATA:
      return payload;
    default:
      return state;
  }
};

export const sentimentMessageReducer = (state = "", { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_SENTIMENT_MESSAGE:
      return payload;
    default:
      return state;
  }
};

export const sentimentDataReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_SENTIMENT_DATA:
      return payload;
    default:
      return state;
  }
};
