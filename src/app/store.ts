import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import dataSlice from "../store/data.slice";
import globalSlice from "../store/global.slice";

export const store = configureStore({
  reducer: {  data: dataSlice , global: globalSlice },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
