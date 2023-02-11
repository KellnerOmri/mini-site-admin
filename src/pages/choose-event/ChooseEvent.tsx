import './ChooseEvent.scss'
import React, {useEffect} from "react";
import {GlobalApiService} from "../../services/global-api.service";
import {text} from "../../utils/dictionaryManagement";
import {Button} from "../../components/button/Button";
import {FormPopup} from "../../components/form-popup/FormPopup";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {setEventList, setSelectedEvent} from "../../store/data.slice";
import {setCreateEventPopup} from "../../store/global.slice";
import {EventModel} from "../../models/event.model";
import {AddEventForm} from "./components/add-event/components/add-event-form/AddEventForm";

export const ChooseEvent = () => {
    const dispatch = useAppDispatch();
    const {events} = useAppSelector(state => state.data);
    const {createEventPopupIsOpen,isEnglish} = useAppSelector(state => state.global);

    const addEvent = () => {
        dispatch(setCreateEventPopup(true))
    }
    const titles = ["Event number", "Description", "Type", "Date"];
    const H_titles = ["מספר אירוע", "שם האירוע", "סוג האירוע", "תאריך"];
    const getTitlesByLanguage=():string[]=>{
        return isEnglish?titles:H_titles.reverse();
    }

    const handleSelectedEvent = (selectedEvent: EventModel) => {
        console.log(selectedEvent, "selected")
        dispatch(setSelectedEvent(selectedEvent))
    }

    useEffect(() => {
        fetch(`${GlobalApiService}/api/v1/event`)
            .then((res) => res.json())
            .then((answer) => {
                console.log(answer, "Event list")
                dispatch(setEventList(answer))
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return <div className={"choose-event-container"}>
        <div style={{direction:isEnglish?"ltr":"rtl"}} className={"typography-h1-heading"}>{isEnglish?text.chooseEvent:text.H_chooseEvent}</div>
        {events.length > 0 ? <div className={"event-list-wrapper"}>
                <table className={"table-style"}>
                    <thead>
                    <tr className={"first-row row"}>
                        {getTitlesByLanguage().map((title, index) => {
                            return (
                                <th key={index} className={"table-headers"}>
                                    <span>{title}</span>
                                </th>
                            );
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {events.map((event, index) => {
                        return  isEnglish ? <tr key={index} onClick={() => handleSelectedEvent(event)}>
                            <td>{event.eventId}</td>
                            <td>{event.description}</td>
                            <td>{event.Type}</td>
                            <td>{event.date}</td>
                        </tr>:
                                <tr key={index} onClick={() => handleSelectedEvent(event)}>
                                    <td>{event.date}</td>
                                    <td>{event.Type}</td>
                                    <td>{event.description}</td>
                                    <td>{event.eventId}</td>
                                </tr>

                    })}
                    </tbody>
                </table>
            </div> :
            <div className={"alert-style"}>
                <span className={"alert-style"}>{text.noExistsEvents}</span>
            </div>}
        <FormPopup title={isEnglish?text.createYourEvent:text.H_createYourEvent}
                   formId={"add-event-form"}
                   show={createEventPopupIsOpen}
                   closeModalFunction={()=>dispatch(setCreateEventPopup(false))}
        >
            <AddEventForm/>
        </FormPopup>
        <div className="add-event-button-wrapper">
            <Button functionAction={addEvent} title={isEnglish?text.createYourEvent:text.H_createYourEvent} iconKey={"plus"}/>
        </div>
    </div>
}