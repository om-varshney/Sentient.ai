import { combineReducers } from "redux";
import {
  viewChangeReducer,
  notificationReducer,
  queryReducer,
  queryFilterViewReducer,
  trendMessageReducer,
  trendDataReducer,
} from "./sentientReducers";

export const reducers = combineReducers({
  view: viewChangeReducer,
  notification: notificationReducer,
  query: queryReducer,
  queryFilterView: queryFilterViewReducer,
  trendMessage: trendMessageReducer,
  trendData: trendDataReducer,
});
