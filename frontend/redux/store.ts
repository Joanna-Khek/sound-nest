import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./services/apiSlice";
import authReducer from "./features/authSlice";
import { fastApiSlice } from "./services/fastApiSlice";

export const store = configureStore({
  // Configure the store with the API slice and auth reducer
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [fastApiSlice.reducerPath]: fastApiSlice.reducer,
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      apiSlice.middleware,
      fastApiSlice.middleware,
    ]),

  devTools: process.env.NODE_ENV !== "production",
});

// Represents your entire Redux state.
export type RootState = ReturnType<(typeof store)["getState"]>;

// Represents the type of your store’s dispatch function
export type AppDispatch = (typeof store)["dispatch"];
