import { ActionTypes } from "../constants/actionTypes";

export const setView = (viewState) => {
  return {
    type: ActionTypes.SET_VIEW,
    payload: viewState,
  };
};

export const setNotificationContent = (notification) => {
  return {
    type: ActionTypes.SET_NOTIFICATION,
    payload: notification,
  };
};

export const setQuery = (query) => {
  return {
    type: ActionTypes.SET_QUERY,
    payload: query,
  };
};

export const setQueryFiltersView = (viewState) => {
  return {
    type: ActionTypes.QUERY_FILTERS_DIALOG,
    payload: viewState,
  };
};

export const setTrendMessage = (message) => {
  return {
    type: ActionTypes.SET_TREND_MESSAGE,
    payload: message,
  };
};

export const setTrendData = (data) => {
  return {
    type: ActionTypes.SET_TREND_DATA,
    payload: data,
  };
};

export const setSentimentMessage = (message) => {
  return {
    type: ActionTypes.SET_SENTIMENT_MESSAGE,
    payload: message,
  };
};

export const setSentimentData = (data) => {
  return {
    type: ActionTypes.SET_SENTIMENT_DATA,
    payload: data,
  };
};

export const setTrendTimer = (timer) => {
  return {
    type: ActionTypes.SET_TREND_TIMER,
    payload: timer,
  };
};

export const setSentimentTimer = (timer) => {
  return {
    type: ActionTypes.SET_SENTIMENT_TIMER,
    payload: timer,
  };
};
