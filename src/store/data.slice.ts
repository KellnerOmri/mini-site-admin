import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataSliceModel} from "../models/data-slice.model";
import {EventModel} from "../models/event.model";
import {HeatModel} from "../models/heat.model";

const initialState: DataSliceModel = {
  events: [],
  selectedEvent:undefined,
  heats:[],
  selectedHeat:undefined
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
    setHeatList: (state, action: PayloadAction<HeatModel[]>) => {
      state.heats = action.payload;
    },
    setSelectedHeat: (state, action: PayloadAction<HeatModel>) => {
      state.selectedHeat = action.payload;
    },
  },
  extraReducers:{}
});

export const {
  setEventList,
  setSelectedEvent,
  setHeatList,
  setSelectedHeat
} = dataSlice.actions;

export default dataSlice.reducer;
