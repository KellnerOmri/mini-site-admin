import './MainPanel.scss'
import {ChooseEvent} from "../choose-event/ChooseEvent";
import {useAppSelector} from "../../app/hooks";
import {EventDetails} from "../event-details/EventDetails";
export const MainPanel=()=>{
    const {selectedEvent} = useAppSelector(state => state.data);
    return <div className={"home-page-container"}>
        {selectedEvent?
           <EventDetails/>:
        <ChooseEvent/>}
    </div>
}