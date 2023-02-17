import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataSliceModel} from "../models/data-slice.model";
import {EventModel} from "../models/event.model";
import {HeatModel} from "../models/heat.model";
import {CategoryModel} from "../models/category.model";
import {SponsorModel} from "../models/sponsor.model";

const initialState: DataSliceModel = {
  events: [],
  selectedEvent:undefined,
  heats:[],
  selectedHeat:undefined,
  selectedCategory:undefined,
  selectedSponsor:undefined,
  sponsors:[]
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
    setSelectedCategory: (state, action: PayloadAction<CategoryModel>) => {
      state.selectedCategory = action.payload;
    },
    setSelectedSponsor: (state, action: PayloadAction<SponsorModel>) => {
      state.selectedSponsor = action.payload;
    },
    setSponsorList: (state, action: PayloadAction<SponsorModel[]>) => {
      state.sponsors = action.payload;
    },
  },
  extraReducers:{}
});

export const {
  setEventList,
  setSelectedEvent,
  setHeatList,
  setSelectedHeat,
  setSelectedCategory,
  setSponsorList,
  setSelectedSponsor
} = dataSlice.actions;

export default dataSlice.reducer;
