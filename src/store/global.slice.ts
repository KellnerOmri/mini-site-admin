import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {GlobalSliceModel} from "../models/global-slice.model";

const initialState: GlobalSliceModel = {
  createEventPopupIsOpen: false,
};
export const globalSlice = createSlice({
  name: "global",
  initialState: initialState,
  reducers: {
    setCreateEventPopup: (state, action: PayloadAction<boolean>) => {
      state.createEventPopupIsOpen = action.payload;
    },
  },
  extraReducers: {}
});

export const {
  setCreateEventPopup,
} = globalSlice.actions;

export default globalSlice.reducer;
