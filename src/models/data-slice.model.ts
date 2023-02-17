import {EventModel} from "./event.model";
import {HeatModel} from "./heat.model";
import {CategoryModel} from "./category.model";
import {SponsorModel} from "./sponsor.model";

export interface DataSliceModel {
    events: EventModel[]
    selectedEvent:EventModel|undefined
    heats:HeatModel[],
    selectedHeat:HeatModel|undefined
    selectedCategory:CategoryModel|undefined
    sponsors:SponsorModel[],
    selectedSponsor:SponsorModel|undefined
}
