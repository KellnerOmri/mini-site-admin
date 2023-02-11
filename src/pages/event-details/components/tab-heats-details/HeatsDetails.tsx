import './HeatsDetails.scss'
import React from "react";
import {text} from "../../../../utils/dictionaryManagement";
import {setSelectedHeat} from "../../../../store/data.slice";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {HeatModel} from "../../../../models/heat.model";
import {FormPopup} from "../../../../components/form-popup/FormPopup";
import {setCreateHeatPopup} from "../../../../store/global.slice";
import {EditHeatForm} from "./EditHeatForm/EditHeatForm";
export const HeatsDetails=()=>{
    const dispatch = useAppDispatch();
    const {heats} = useAppSelector(state => state.data);
    const {createHeatPopupIsOpen,isEnglish} = useAppSelector(state => state.global);
    const titles = ["Heat number", "Description","Rolls","Max age","Min age","Price"];
    const H_titles = ["מספר מקצה", "תיאור מקצה","מספר מקצה תחרותי","גיל מקסימלי","גיל מינימלי","מחיר"];

    const getTitlesByLanguage=():string[]=>{
        return isEnglish?titles:H_titles.reverse();
    }

    const handleSelectedHeat=(selectedHeat:HeatModel)=>{
        console.log(selectedHeat,"selected")
        dispatch(setSelectedHeat(selectedHeat))
        dispatch(setCreateHeatPopup(true))

    }

    return <div className={"heats-details-container"}>
        {heats.length > 0 ? <div className={"event-list-wrapper"}>
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
                    {heats.map((heat, index) => {
                        return  isEnglish ? <tr key={index} onClick={()=>handleSelectedHeat(heat)}>
                            <td>{heat.eventId}</td>
                            <td>{heat.description}</td>
                            <td>{heat.Rolls}</td>
                            <td>{heat.MaxAge}</td>
                            <td>{heat.MinAge}</td>
                            <td>{heat.PriceProfile}</td>
                        </tr>:<tr key={index} onClick={()=>handleSelectedHeat(heat)}>
                            <td>{heat.PriceProfile}</td>
                            <td>{heat.MinAge}</td>
                            <td>{heat.MaxAge}</td>
                            <td>{heat.Rolls}</td>
                            <td>{heat.description}</td>
                            <td>{heat.eventId}</td>
                        </tr>
                    })}
                    </tbody>
                </table>
            </div> :
            <div className={"alert-style"} >
                <span className={"alert-style"}>{text.noExistsHeats}</span>
            </div>}
        <FormPopup title={isEnglish?text.editYourHeat:text.H_editYourHeat}
                   formId={"edit-heat-form"}
                   show={createHeatPopupIsOpen}
                   closeModalFunction={()=>dispatch(setCreateHeatPopup(false))}
        >
            <EditHeatForm/>
        </FormPopup>
    </div>
}