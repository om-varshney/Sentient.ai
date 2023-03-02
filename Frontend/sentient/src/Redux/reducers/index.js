import { combineReducers } from "redux";
import {
  viewChangeReducer,
  notificationReducer,
  queryReducer,
  queryFilterViewReducer,
  trendMessageReducer,
  trendDataReducer,
  sentimentMessageReducer,
  sentimentDataReducer,
  trendTimerReducer,
  sentimentTimerReducer,
} from "./sentientReducers";

export const reducers = combineReducers({
  view: viewChangeReducer,
  notification: notificationReducer,
  query: queryReducer,
  queryFilterView: queryFilterViewReducer,
  trendMessage: trendMessageReducer,
  trendData: trendDataReducer,
  sentimentMessage: sentimentMessageReducer,
  sentimentData: sentimentDataReducer,
  trendTimer: trendTimerReducer,
  sentimentTimer: sentimentTimerReducer,
});
