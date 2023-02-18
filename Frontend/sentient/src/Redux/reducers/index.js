import { combineReducers } from "redux";
import {
  viewChangeReducer,
  notificationReducer,
  queryReducer,
  queryFilterViewReducer,
} from "./sentientReducers";

export const reducers = combineReducers({
  view: viewChangeReducer,
  notification: notificationReducer,
  query: queryReducer,
  queryFilterView: queryFilterViewReducer,
});
