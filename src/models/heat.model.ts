import {CategoryModel} from "./category.model";

export interface HeatModel {
    MaxAge: number
    MinAge: number
    PriceProfile: number
    Rolls: number
    amami: number
    description: string
    eventId: number
    heatId: number
    mapIframe: number
    mapUrl: string
    prize: number
    routeDescription: string
    showMap: number
    startHeat: string
    categoriesLIst:CategoryModel[]
}
