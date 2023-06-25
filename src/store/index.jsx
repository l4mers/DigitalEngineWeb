import { configureStore, combineReducers } from "@reduxjs/toolkit";
import loaderSlice from "./modules/loaderSlice";
import venuesSlice from "./modules/venuesSlice";

const reducer = combineReducers({
  loader: loaderSlice,
  venues: venuesSlice,
});

const index = configureStore({
  reducer,
});

export default index;
