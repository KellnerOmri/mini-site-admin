import './GeneralEventDetails.scss'
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import { Checkbox, TextareaAutosize, TextField} from "@mui/material";
import React, {useState} from "react";
import {Button} from "../../../../components/button/Button";
import {setCreateEventPopup} from "../../../../store/global.slice";
import {GlobalApiService, headersApi} from "../../../../services/global-api.service";
import {text} from "../../../../utils/dictionaryManagement";
export const GeneralEventDetails=()=>{
    const dispatch = useAppDispatch();
    const {isEnglish} = useAppSelector(state => state.global);
    const {selectedEvent} = useAppSelector(state => state.data);
    const [eventFormInput, setEventFormInput] = useState<{ [key: string]: number | string | boolean }>(
        {
            eventId: selectedEvent?.eventId ?? 0,
            comp: selectedEvent?.comp?? 0,
            codeName: selectedEvent?.codeName?? "",
            description: selectedEvent?.description?? "",
            date: selectedEvent?.date?? "",
            Type: selectedEvent?.description?? "run",
            backgroundColor: selectedEvent?.backgroundColor?? "#2B76E5",
            secondaryColor: selectedEvent?.secondaryColor?? "#808080",
            foregroundColor: selectedEvent?.foregroundColor?? "#c3c6d4",
            showMaps: selectedEvent?.showMaps?? 0,
            tavTeken: selectedEvent?.tavTeken?? 0,
            comments: selectedEvent?.comments?? ""
        });
    const handleInput = (e: any) => {
        const name = e.target.name;
        const newValue = e.target.value;
        setEventFormInput({...eventFormInput, [name]: newValue as string | number})
    };

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
    return <div className={"general-event-detils-container"}>
        <form id={"edit-event-form"} className={"formContainer"}>
            <TextField
                label={isEnglish?text.eventName:text.H_eventName}
                id="description"
                name="description"
                type={"text"}
                disabled={true}
                value={eventFormInput.description}
                InputLabelProps={{shrink: true}}
            />
            <TextField
                label={isEnglish?text.date:text.H_date}
                id="date"
                name="date"
                type={"text"}
                value={eventFormInput.date}
                disabled={true}
                InputLabelProps={{shrink: true}}
            />
            <TextField
                label={isEnglish?text.backgroundColor:text.H_backgroundColor}
                id="margin-normal"
                name="backgroundColor"
                type={"color"}
                onChange={handleInput}
                value={eventFormInput.backgroundColor}
            />
            <TextField
                label={isEnglish?text.secondaryColor:text.H_secondaryColor}
                id="margin-normal"
                name="secondaryColor"
                type={"color"}
                onChange={handleInput}
                value={eventFormInput.secondaryColor}
            />
            <TextField
                label={isEnglish?text.foregroundColor:text.H_foregroundColor}
                id="margin-normal"
                name="foregroundColor"
                type={"color"}
                onChange={handleInput}
                defaultValue={eventFormInput.foregroundColor}
            />
            <div style={{direction:isEnglish?"ltr":"rtl", textAlign:isEnglish?"left":"right"}} className={"checkbox-wrapper"}>
                <span>{isEnglish?text.showMap:text.H_showMap}</span>
                <Checkbox
                    value={eventFormInput.showMaps as boolean}
                    name={"showMaps"}
                    onChange={(e) => setEventFormInput({...eventFormInput, "showMaps": e.target.checked ? 1 : 0})}
                />
            </div>
            <div style={{direction:isEnglish?"ltr":"rtl", textAlign:isEnglish?"left":"right"}} className={"checkbox-wrapper"}>
                <span>{isEnglish?text.tavTeken:text.H_tavTeken}</span>
                <Checkbox
                    value={eventFormInput.tavTeken as boolean}
                    name={"tavTeken"}
                    onChange={(e) => setEventFormInput({...eventFormInput, "tavTeken": e.target.checked ? 1 : 0})}
                />
            </div>
            <div style={{direction:isEnglish?"ltr":"rtl", textAlign:isEnglish?"left":"right"}} className={"textarea-autosize-container"}>
                <div>{isEnglish?text.comments:text.H_comments}</div>
                <TextareaAutosize
                    style={{padding:4}}
                    value={eventFormInput.comments as string}
                    onChange={handleInput} id="margin-normal" className={"checkbox-wrapper"}
                    placeholder={"Add comments"}
                    minRows={0}
                    maxRows={10}
                    name={"comments"}/>
            </div>
            <Button functionAction={submitEditEvent} type={"submit"} title={isEnglish?text.updateEventDetails:text.H_updateEventDetails}/>
        </form>
    </div>
}