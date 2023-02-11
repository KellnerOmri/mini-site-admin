import {EventModel} from "./event.model";
import {HeatModel} from "./heat.model";

export interface DataSliceModel {
    events: EventModel[]
    selectedEvent:EventModel|undefined
    heats:HeatModel[],
    selectedHeat:HeatModel|undefined
}
