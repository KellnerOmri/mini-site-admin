import './EventDetails.scss'
import {text} from "../../utils/dictionaryManagement";
import { Tab } from '@headlessui/react';
import {HeatsDetails} from "./components/tab-heats-details/HeatsDetails";
import {GeneralEventDetails} from "./components/tab-general-event-details/GeneralEventDetails";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {CategoriesManagement} from "./components/tab-categories/CategoriesManagement";
import {useEffect} from "react";
import {GlobalApiService} from "../../services/global-api.service";
import {setHeatList, setSponsorList} from "../../store/data.slice";
import {HeatModel} from "../../models/heat.model";
import {CategoryModel} from "../../models/category.model";
import {SponsorsEventDetails} from "./components/tab-sponsor/SponsorsEventDetails";
import {SponsorModel} from "../../models/sponsor.model";
export const EventDetails=()=>{
    const dispatch = useAppDispatch();

    const {isEnglish} = useAppSelector(state => state.global);
    const {selectedEvent} = useAppSelector(state => state.data);

    const tabClassName=(selected:boolean)=>{
        return  selected
            ? 'selected-tab'
            : 'not-selected-tab'
    }
    const titles = ["General","Heats","Sponsor","Maps","Categories"]
    const H_titles = ["כללי","מקצים","ספונסרים","מפות","קטגוריות"]

    const jsxTabsArray = [<GeneralEventDetails/>,<HeatsDetails/>,<SponsorsEventDetails/>,<div>"Content 3"</div>,<CategoriesManagement/>]

    const getTitlesByLanguage = ():string[]=>{
        return isEnglish?titles:H_titles.reverse()
    }
    const getJsxByLanguage = ()=>{
        return isEnglish?jsxTabsArray:jsxTabsArray.reverse()
    }


const getCategoriesByHeat=(categories:CategoryModel[],heatId:number):CategoryModel[]=>{
        const categoryList:CategoryModel[]=[]
    categories.forEach((category)=>{
        if (category.heatId === heatId){
            categoryList.push(category)
        }
    })
        return categoryList
}
    useEffect(()=>{
        Promise.all([
            fetch(`${GlobalApiService}/api/v1/heat/${selectedEvent?.eventId}`),
            fetch(`${GlobalApiService}/api/v1/category/${selectedEvent?.eventId}`),
            fetch(`${GlobalApiService}/api/v1/sponsor/${selectedEvent?.eventId}`)
        ])
            .then(res =>Promise.all(res.map(r=> r.json())))
            .then((stats) => {
                const newHeatsArray:HeatModel[]=[];
                let fetchHeatList:HeatModel[]=stats[0];
                let fetchCategoryList:CategoryModel[]=stats[1];
                let fetchSponsorList:SponsorModel[]=stats[2];
                fetchHeatList.forEach((heatItem)=>{
                    newHeatsArray.push({...heatItem,categoriesLIst:getCategoriesByHeat(fetchCategoryList,heatItem.heatId)})
                })
                dispatch(setHeatList(newHeatsArray))
                dispatch(setSponsorList(fetchSponsorList))
                console.log(fetchSponsorList,"fetchSponsorList")
                console.log(stats,"status")
            })
            .then((info) => {
                console.log(info,"info")
            })
            .then(data =>  console.log(data)).catch(error => console.log(error));
    },[])


    return <div className={"event-details-container"}>
        <div style={{direction:isEnglish?"ltr":"rtl"}} className={"typography-h1-heading"}>{isEnglish?text.eventDetails:text.H_eventDetails}</div>
            <Tab.Group defaultIndex={isEnglish?0:H_titles.length}>
                <div className={"tab-list-wrapper"}>
                <Tab.List className="tab-list">
                    {getTitlesByLanguage().map((t,index)=>{
                        return <Tab key={index} className={({selected})=>{ return tabClassName(selected)}}>{t}</Tab>
                    })}
                </Tab.List>
                </div>

                <Tab.Panels className={"panels-container"}>
                    {getJsxByLanguage().map((jsxElement,index)=>{
                        return  <Tab.Panel key={index} className={"tab-panel"}>{jsxElement}</Tab.Panel>
                    })}
                </Tab.Panels>
            </Tab.Group>
    </div>
}