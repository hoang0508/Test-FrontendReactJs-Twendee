import { configureStore, combineReducers } from "@reduxjs/toolkit";
import usersSlice from "./usersSlice";

const reducer = combineReducers({
  users: usersSlice,
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
