import { configureStore } from "@reduxjs/toolkit";

import dataUserReducer from "features/DataUserSlice/dataUserSlice.ts";

import { authReducer } from "features/DataUserSlice/authSlice.ts";
import { loadingReducer } from "@/features/loadingSlice/loadingSlice";
export const store = configureStore({
  reducer: {
    dataUser: dataUserReducer,
    auth: authReducer,
    loadingReducer: loadingReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
