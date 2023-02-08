import {EventModel} from "./event.model";

export interface DataSliceModel {
    events: EventModel[]
    selectedEvent:EventModel|undefined
}
