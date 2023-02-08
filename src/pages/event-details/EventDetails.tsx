import './EventDetails.scss'
import {text} from "../../utils/dictionaryManagement";
import { Tab } from '@headlessui/react';
import {HeatsDetails} from "./components/heats-details/HeatsDetails";
import {GeneralEventDetails} from "./components/general-event-details/GeneralEventDetails";
export const EventDetails=()=>{
    const tabClassName=(selected:boolean)=>{
        return  selected
            ? 'selected-tab'
            : 'not-selected-tab'
    }
    return <div className={"event-details-container"}>
        <span className={"typography-h1-heading"}>{text.eventDetails}</span>
            <Tab.Group>
                <div className={"tab-list-wrapper"}>

                <Tab.List className=" tab-list">
                    <Tab className={({selected})=>{ return tabClassName(selected)}}>General</Tab>
                    <Tab className={({selected})=>{ return tabClassName(selected)}}>Heats</Tab>
                    <Tab className={({selected})=>{ return tabClassName(selected)}}>Sponsor</Tab>
                    <Tab className={({selected})=>{ return tabClassName(selected)}}>Maps</Tab>
                </Tab.List>
                </div>

                <Tab.Panels className={"panels-container"}>
                    <Tab.Panel className={"tab-panel"}><GeneralEventDetails/></Tab.Panel>
                    <Tab.Panel className={"tab-panel"}><HeatsDetails/></Tab.Panel>
                    <Tab.Panel className={"tab-panel"}>Content 2</Tab.Panel>
                    <Tab.Panel className={"tab-panel"}>Content 3</Tab.Panel>
                </Tab.Panels>

            </Tab.Group>
    </div>
}