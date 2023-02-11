import {EventModel} from "./event.model";
import {HeatModel} from "./heat.model";
import {CategoryModel} from "./category.model";

export interface DataSliceModel {
    events: EventModel[]
    selectedEvent:EventModel|undefined
    heats:HeatModel[],
    selectedHeat:HeatModel|undefined
    selectedCategory:CategoryModel|undefined
}
