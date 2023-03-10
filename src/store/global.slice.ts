import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {GlobalSliceModel} from "../models/global-slice.model";

const initialState: GlobalSliceModel = {
  createEventPopupIsOpen: false,
  createHeatPopupIsOpen: false,
  isEnglish:true,
  editCategoryPopupIsOpen:false,
  editSponsorsPopupIsOpen:false
};
export const globalSlice = createSlice({
  name: "global",
  initialState: initialState,
  reducers: {
    setIsEnglish: (state, action: PayloadAction<boolean>) => {
      state.isEnglish = action.payload;
    },
    setCreateEventPopup: (state, action: PayloadAction<boolean>) => {
      state.createEventPopupIsOpen = action.payload;
    },
    setCreateHeatPopup: (state, action: PayloadAction<boolean>) => {
      state.createHeatPopupIsOpen = action.payload;
    },
    setEditCategoryPopup: (state, action: PayloadAction<boolean>) => {
      state.editCategoryPopupIsOpen = action.payload;
    },
    setEditSponsorPopup: (state, action: PayloadAction<boolean>) => {
      state.editSponsorsPopupIsOpen = action.payload;
    },
  },
  extraReducers: {}
});

export const {
  setIsEnglish,
  setCreateEventPopup,
  setCreateHeatPopup,
  setEditCategoryPopup,
  setEditSponsorPopup
} = globalSlice.actions;

export default globalSlice.reducer;
