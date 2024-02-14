import { combineReducers } from "@reduxjs/toolkit";
import appReducer from "./slices/app/index";

const rootReducer = combineReducers({
  app: appReducer,
});

export default rootReducer;
