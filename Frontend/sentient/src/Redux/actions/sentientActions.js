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
