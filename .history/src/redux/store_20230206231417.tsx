import { configureStore, combineReducers } from "@reduxjs/toolkit";
import usersSlice from "./usersSlice";
import { loadingBarReducer } from "react-redux-loading-bar";

const reducer = combineReducers({
  users: usersSlice,
  loadinBar: loadingBarReducer,
});

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
