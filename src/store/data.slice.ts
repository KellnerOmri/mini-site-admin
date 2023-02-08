import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataSliceModel} from "../models/data-slice.model";
import {EventModel} from "../models/event.model";

const initialState: DataSliceModel = {
  events: [],
  selectedEvent:undefined
};

export const dataSlice = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    setEventList: (state, action: PayloadAction<EventModel[]>) => {
      state.events = action.payload;
    },
    setSelectedEvent: (state, action: PayloadAction<EventModel>) => {
      state.selectedEvent = action.payload;
    },
  },
  extraReducers:{}
});

export const {
  setEventList,
  setSelectedEvent
} = dataSlice.actions;

export default dataSlice.reducer;
