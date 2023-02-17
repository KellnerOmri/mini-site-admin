import './GeneralEventDetails.scss'
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {Autocomplete, Checkbox, TextField} from "@mui/material";
import React, {useState} from "react";
import {Button} from "../../../../components/button/Button";
import {setCreateEventPopup} from "../../../../store/global.slice";
import {GlobalApiService, headersApi} from "../../../../services/global-api.service";
import {text} from "../../../../utils/dictionaryManagement";
import {EditHtml} from "../../../../components/edit-html/EditHtml";
import moment from "moment";
import {log} from "util";
import {CompModel} from "../../../../models/comp.model";

export const GeneralEventDetails = () => {
    const dispatch = useAppDispatch();
    const {isEnglish} = useAppSelector(state => state.global);
    const {selectedEvent} = useAppSelector(state => state.data);
    const [eventFormInput, setEventFormInput] = useState<{ [key: string]: number | string | boolean | Date }>(
        {
            eventId: selectedEvent?.eventId ?? 0,
            comp: selectedEvent?.comp ?? 0,
            codeName: selectedEvent?.codeName ?? "",
            description: selectedEvent?.description ?? "",
            date: selectedEvent?.date ?? "",
            location: selectedEvent?.location ?? "",
            Type: selectedEvent?.Type ?? "run",
            backgroundColor: selectedEvent?.backgroundColor ?? "#2B76E5",
            secondaryColor: selectedEvent?.secondaryColor ?? "#808080",
            foregroundColor: selectedEvent?.foregroundColor ?? "#c3c6d4",
            showMaps: selectedEvent?.showMaps ?? 0,
            tavTeken: selectedEvent?.tavTeken ?? 0,
            comments: selectedEvent?.comments ?? "",
            showParticipants: selectedEvent?.showParticipants ?? 0,
            participationMedal: selectedEvent?.participationMedal ?? 0,
            shortName: selectedEvent?.shortName ?? "",
            logo: selectedEvent?.logo ?? "",
            registrationUrl: selectedEvent?.registrationUrl ?? "",
            participantsListUrl: selectedEvent?.participantsListUrl ?? "",
            resultsUrl: selectedEvent?.resultsUrl ?? "",
            coverImage: selectedEvent?.coverImage ?? "",
            detailsImage: selectedEvent?.detailsImage ?? "",
            contactImage: selectedEvent?.contactImage ?? "",
            contactPhone: selectedEvent?.contactPhone ?? "",
            organizerDetails: selectedEvent?.organizerDetails ?? "",
            gatheringTime: selectedEvent?.gatheringTime ?? "",
            ceremonyTime: selectedEvent?.ceremonyTime ?? "",
            enrollmentInclude: selectedEvent?.enrollmentInclude ?? "",
            dateTime: selectedEvent?.dateTime ?? "01/01/23 03:00",
            endDate: selectedEvent?.endDate ?? "01/01/23 01:00",
            status: selectedEvent?.status ?? "registration",
            isRegistrationInEventDay: selectedEvent?.isRegistrationInEventDay ?? 0
        });
    console.log(eventFormInput,"checkoing")
    const handleInput = (e: any) => {
        const name = e.target.name;
        const newValue = e.target.value;
        setEventFormInput({...eventFormInput, [name]: newValue as string | number})
    };

    const handleDateTime = (e: any) => {
        const name = e.target.name;
        const newValue = moment(e.target.value).format("DD/MM/YY HH:mm");
        setEventFormInput({...eventFormInput, [name]: newValue as string})
    }
    const handleDate = (e: any) => {
        //10/03/23
        console.log(e.target.value, "value")
        const name = e.target.name;
        const newValue = moment(e.target.value).format("DD/MM/YY");
        console.log(newValue, "newValue")
        setEventFormInput({...eventFormInput, [name]: newValue as string})
    }

    const submitEditEvent = (e: any) => {
        dispatch(setCreateEventPopup(false))
        fetch(`${GlobalApiService}/api/v1/event/${eventFormInput.eventId}`,
            {
                method: 'PUT',
                body: JSON.stringify({
                    eventFormInput
                }),
                headers: headersApi
            }
        )
            .then((res) => res.json())
            .then((answer) => {
                console.log(answer, "Event list")
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
    const getDateTimeByMomentString = (engineFormat: string): string => {
        const inputDateTIme = engineFormat.split(" ");
        const inputDate = inputDateTIme[0].split("/");
        const inputTime = inputDateTIme[1];
        const day = inputDate[0];
        const month = inputDate[1];
        const year = inputDate[2];
        const newDatePickerFormat = `20${year}-${month}-${day}T${inputTime}`
        return newDatePickerFormat
    }
    const getDateByMomentString = (dateInput: string): string => {
        const inputDate = dateInput.split("/");
        const day = inputDate[0];
        const month = inputDate[1];
        const year = inputDate[2];
        const newDatePickerFormat = `20${year}-${month}-${day}`
        return newDatePickerFormat
    }
    const [eventTypeInputValue, setEventTypeInputValue] = React.useState("");
    const eventTypeListName = ["run", "swim", "byc"];

    const [eventStatusInputValue, setEventStatusInputValue] = React.useState("");
    const eventStatusListName = ["registration", "result"];

    return <div className={"general-event-detils-container"}>
        <form id={"edit-event-form"} className={"formContainer"}>
            <TextField
                label={isEnglish ? text.eventName : text.H_eventName}
                id="description"
                name="description"
                type={"text"}
                onChange={handleInput}
                value={eventFormInput.description}
                InputLabelProps={{shrink: true}}
                required={true}
            />
            <TextField
                label={isEnglish ? text.date : text.H_date}
                id="date"
                name="date"
                type={"date"}
                value={getDateByMomentString(eventFormInput.date as string)}
                onChange={handleDate}
                InputLabelProps={{shrink: true}}
                required={true}
            />
            <TextField
                label={isEnglish ? text.location : text.H_location}
                id="location"
                name="location"
                type={"text"}
                onChange={handleInput}
                value={eventFormInput.location}
                InputLabelProps={{shrink: true}}
            />
            <Autocomplete
                className={"autocomplete-child"}
                value={eventFormInput.Type as string}
                inputValue={eventTypeInputValue}
                onInputChange={(event, newInputValue) => {
                    setEventTypeInputValue(newInputValue);
                }}
                onChange={(event: any, newValue: string | null) => {
                        setEventFormInput({...eventFormInput, "Type": newValue as string})
                }}
                size={"small"}
                disablePortal
                id="combo-box-demo"
                options={eventTypeListName}
                renderInput={params => <TextField style={{fontSize: "30px !important"}}
                                                  className="text-Field-style" {...params}
                                                  label={`${isEnglish ? text.eventType : text.H_eventType}`}
                                                  name="Type"
                                                  id="Type"
                                                  type={"text"}
                                                  required={true}
                />}
            />
            <Autocomplete
                className={"autocomplete-child"}
                value={eventFormInput.status as string}
                inputValue={eventStatusInputValue}
                onInputChange={(event, newInputValue) => {
                    setEventStatusInputValue(newInputValue);
                }}
                onChange={(event: any, newValue: string | null) => {
                    setEventFormInput({...eventFormInput, "status": newValue as string})
                }}
                size={"small"}
                disablePortal
                id="combo-box-demo"
                options={eventStatusListName}
                renderInput={params => <TextField style={{fontSize: "30px !important"}}
                                                  className="text-Field-style" {...params}
                                                  label={`${isEnglish ? text.status : text.H_status}`}
                                                  name="status"
                                                  id="status"
                                                  type={"text"}
                                                  required={true}
                />}
            />

            <TextField
                label={isEnglish ? text.dateTime : text.H_dateTime}
                id="dateTime"
                name="dateTime"
                type={"datetime-local"}
                value={getDateTimeByMomentString(eventFormInput.dateTime as string)}//"2023-02-16T22:36"
                onChange={handleDateTime}
                InputLabelProps={{shrink: true}}
            />
            <TextField
                label={isEnglish ? text.endDate : text.H_endDate}
                id="endDate"
                name="endDate"
                type={"datetime-local"}
                value={getDateTimeByMomentString(eventFormInput.endDate as string)}//"2023-02-16T22:36"
                onChange={handleDateTime}
                InputLabelProps={{shrink: true}}
            />

            <TextField
                label={isEnglish ? text.backgroundColor : text.H_backgroundColor}
                id="margin-normal"
                name="backgroundColor"
                type={"color"}
                onChange={handleInput}
                value={eventFormInput.backgroundColor}
            />
            <TextField
                label={isEnglish ? text.secondaryColor : text.H_secondaryColor}
                id="margin-normal"
                name="secondaryColor"
                type={"color"}
                onChange={handleInput}
                value={eventFormInput.secondaryColor}
            />
            <TextField
                label={isEnglish ? text.foregroundColor : text.H_foregroundColor}
                id="margin-normal"
                name="foregroundColor"
                type={"color"}
                onChange={handleInput}
                defaultValue={eventFormInput.foregroundColor}
            />
            <div style={{direction: isEnglish ? "ltr" : "rtl", textAlign: isEnglish ? "left" : "right"}}
                 className={"checkbox-wrapper"}>
                <span>{isEnglish ? text.showMap : text.H_showMap}</span>
                <Checkbox
                    checked={eventFormInput.showMaps === 1}
                    name={"showMaps"}
                    onChange={(e) => setEventFormInput({...eventFormInput, "showMaps": e.target.checked ? 1 : 0})}
                />
            </div>

            <div style={{direction: isEnglish ? "ltr" : "rtl", textAlign: isEnglish ? "left" : "right"}}
                 className={"checkbox-wrapper"}>
                <span>{isEnglish ? text.isRegistrationInEventDay : text.H_isRegistrationInEventDay}</span>
                <Checkbox
                    checked={eventFormInput.isRegistrationInEventDay === 1}
                    name={"isRegistrationInEventDay"}
                    onChange={(e) => setEventFormInput({...eventFormInput, "isRegistrationInEventDay": e.target.checked ? 1 : 0})}
                />
            </div>







            <div style={{direction: isEnglish ? "ltr" : "rtl", textAlign: isEnglish ? "left" : "right"}}
                 className={"checkbox-wrapper"}>
                <span>{isEnglish ? text.tavTeken : text.H_tavTeken}</span>
                <Checkbox
                    checked={eventFormInput.tavTeken === 1}
                    name={"tavTeken"}
                    onChange={(e) => setEventFormInput({...eventFormInput, "tavTeken": e.target.checked ? 1 : 0})}
                />
            </div>
            <div style={{direction: isEnglish ? "ltr" : "rtl", textAlign: isEnglish ? "left" : "right"}}
                 className={"checkbox-wrapper"}>
                <span>{isEnglish ? text.showParticipants : text.H_showParticipants}</span>
                <Checkbox
                    checked={eventFormInput.showParticipants === 1}
                    name={"showParticipants"}
                    onChange={(e) => setEventFormInput({
                        ...eventFormInput,
                        "showParticipants": e.target.checked ? 1 : 0
                    })}
                />
            </div>
            <div style={{direction: isEnglish ? "ltr" : "rtl", textAlign: isEnglish ? "left" : "right"}}
                 className={"checkbox-wrapper"}>
                <span>{isEnglish ? text.participationMedal : text.H_participationMedal}</span>
                <Checkbox
                    checked={eventFormInput.participationMedal === 1}
                    name={"participationMedal"}
                    onChange={(e) => setEventFormInput({
                        ...eventFormInput,
                        "participationMedal": e.target.checked ? 1 : 0
                    })}
                />
            </div>
            <TextField
                label={isEnglish ? text.shortName : text.H_shortName}
                id="shortName"
                name="shortName"
                type={"text"}
                onChange={handleInput}
                value={eventFormInput.shortName}
                InputLabelProps={{shrink: true}}
            />
            <EditHtml eventFormInput={eventFormInput} setEventFormInput={setEventFormInput}/>

            <TextField
                label={isEnglish ? text.logo : text.H_logo}
                id="logo"
                name="logo"
                type={"text"}
                onChange={handleInput}
                value={eventFormInput.logo}
                InputLabelProps={{shrink: true}}
            />
            <TextField
                label={isEnglish ? text.registrationUrl : text.H_registrationUrl}
                id="registrationUrl"
                name="registrationUrl"
                type={"text"}
                onChange={handleInput}
                value={eventFormInput.registrationUrl}
                InputLabelProps={{shrink: true}}
            />
            <TextField
                label={isEnglish ? text.participantsListUrl : text.participantsListUrl}
                id="participantsListUrl"
                name="participantsListUrl"
                type={"text"}
                onChange={handleInput}
                value={eventFormInput.participantsListUrl}
                InputLabelProps={{shrink: true}}
            />
            <TextField
                label={isEnglish ? text.resultsUrl : text.H_resultsUrl}
                id="resultsUrl"
                name="resultsUrl"
                type={"text"}
                onChange={handleInput}
                value={eventFormInput.resultsUrl}
                InputLabelProps={{shrink: true}}
            />
            <TextField
                label={isEnglish ? text.coverImage : text.H_coverImage}
                id="coverImage"
                name="coverImage"
                type={"text"}
                onChange={handleInput}
                value={eventFormInput.coverImage}
                InputLabelProps={{shrink: true}}
            />
            <TextField
                label={isEnglish ? text.detailsImage : text.H_detailsImage}
                id="detailsImage"
                name="detailsImage"
                type={"text"}
                onChange={handleInput}
                value={eventFormInput.detailsImage}
                InputLabelProps={{shrink: true}}
            />
            <TextField
                label={isEnglish ? text.contactImage : text.H_contactImage}
                id="contactImage"
                name="contactImage"
                type={"text"}
                onChange={handleInput}
                value={eventFormInput.contactImage}
                InputLabelProps={{shrink: true}}
            />
            <TextField
                label={isEnglish ? text.contactPhone : text.H_contactPhone}
                id="contactPhone"
                name="contactPhone"
                type={"text"}
                onChange={handleInput}
                value={eventFormInput.contactPhone}
                InputLabelProps={{shrink: true}}
            />
            <TextField
                label={isEnglish ? text.organizerDetails : text.H_organizerDetails}
                id="organizerDetails"
                name="organizerDetails"
                type={"text"}
                onChange={handleInput}
                value={eventFormInput.organizerDetails}
                InputLabelProps={{shrink: true}}
            />
            <TextField
                label={isEnglish ? text.gatheringTime : text.H_gatheringTime}
                id="gatheringTime"
                name="gatheringTime"
                type={"text"}
                onChange={handleInput}
                value={eventFormInput.gatheringTime}
                InputLabelProps={{shrink: true}}
            />
            <TextField
                label={isEnglish ? text.ceremonyTime : text.H_ceremonyTime}
                id="ceremonyTime"
                name="ceremonyTime"
                type={"text"}
                onChange={handleInput}
                value={eventFormInput.ceremonyTime}
                InputLabelProps={{shrink: true}}
            />
            <TextField
                label={isEnglish ? text.enrollmentInclude : text.H_enrollmentInclude}
                id="enrollmentInclude"
                name="enrollmentInclude"
                type={"text"}
                onChange={handleInput}
                value={eventFormInput.enrollmentInclude}
                InputLabelProps={{shrink: true}}
            />
            <Button functionAction={submitEditEvent} type={"submit"}
                    title={isEnglish ? text.updateEventDetails : text.H_updateEventDetails}/>
        </form>
    </div>
}