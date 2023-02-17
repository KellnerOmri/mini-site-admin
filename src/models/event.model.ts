import {SponsorModel} from "./sponsor.model";

export interface EventModel {
    "eventId": number,
    "comp": number,
    "codeName": string,
    "backgroundColor": string,
    "foregroundColor": string,
    "secondaryColor": string,
    "showMaps": number,
    "tavTeken": number,
    "comments": string,
    "description": string,
    "date": string,
    "Type": string,
    "sponsor": SponsorModel[],
    location:string,
    "showParticipants": number,
    "participationMedal": number,


    "shortName": string,
    "logo": string,
    "registrationUrl": string,
    "participantsListUrl": string,
    "resultsUrl": string,
    "coverImage": string,
    "detailsImage": string,
    "contactImage": string,
    "contactPhone": string
    "organizerDetails": string,
    "gatheringTime": string,
    "ceremonyTime": string,
    "enrollmentInclude": string,

    "dateTime": string,
    "endDate": string,
    "status": string,
    "isRegistrationInEventDay": number
}
