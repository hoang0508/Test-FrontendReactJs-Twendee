import { configureStore, combineReducers } from "@reduxjs/toolkit";

const reducer = combineReducers({});

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(),
});

export default store;
