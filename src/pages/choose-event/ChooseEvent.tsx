import './ChooseEvent.scss'
import {useEffect} from "react";
import {GlobalApiService} from "../../services/global-api.service";
import {text} from "../../utils/dictionaryManagement";
import {Button} from "../../components/button/Button";
import {AddEvent} from "./components/add-event/AddEvent";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {setEventList, setSelectedEvent} from "../../store/data.slice";
import {setCreateEventPopup} from "../../store/global.slice";
import {EventModel} from "../../models/event.model";

export const ChooseEvent = () => {
    const dispatch = useAppDispatch();
    const {events} = useAppSelector(state => state.data);

    const addEvent = () => {
        dispatch(setCreateEventPopup(true))
    }
    const titles = ["Event number", "Description", "Type", "Date"];
    const handleSelectedEvent=(selectedEvent:EventModel)=>{
        console.log(selectedEvent,"selected")
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
        <span className={"typography-h1-heading"}>{text.chooseEvent}</span>
        {events.length > 0 ? <div className={"event-list-wrapper"}>
                <table className={"table-style"}>
                    <thead>
                    <tr className={"first-row row"}>
                        {titles.map((title, index) => {
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
                        return <tr key={index} onClick={()=>handleSelectedEvent(event)}>
                            <td>{event.eventId}</td>
                            <td>{event.description}</td>
                            <td>{event.Type}</td>
                            <td>{event.date}</td>
                        </tr>
                    })}
                    </tbody>
                </table>
            </div> :
            <div className={"alert-style"} >
                <span className={"alert-style"}>{text.noExistsEvents}</span>
            </div>}
        <AddEvent/>
        <div className="add-event-button-wrapper">
            <Button  functionAction={addEvent} title={"Create new event"} iconKey={"plus"}/>
        </div>
    </div>
}