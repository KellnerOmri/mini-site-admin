import './CategoriesManagement.scss'
import React, {useState} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {AddCategoryToList} from "./components/AddCategoryToList";
import {text} from "../../../../utils/dictionaryManagement";
import {setEditCategoryPopup} from "../../../../store/global.slice";
import {EditCategoryForm} from "./components/edit-category-form/EditCategoryForm";
import {FormPopup} from "../../../../components/form-popup/FormPopup";
export const CategoriesManagement=()=>{
    const dispatch = useAppDispatch();

    const {isEnglish,editCategoryPopupIsOpen} = useAppSelector(state => state.global);
    const { heats} = useAppSelector(state => state.data);
    const [heatIndex,setHeatIndex]=useState(0)
    return <div className={"edit-categories-container"}>
        <div style={{direction:isEnglish?"ltr":"rtl", textAlign:isEnglish?"left":"right"}} className={"button-update-category-wrapper"}>
        </div>

        {heats.map((heat,index)=>{
            return  <Accordion key={index}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`${heat.heatId}`}
                    id={`${heat.heatId}`}
                >
                    <Typography>{`${heat.heatId}. ${heat.description}`}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <AddCategoryToList setHeatIndex={setHeatIndex} heat={heat} index={index}/>
                </AccordionDetails>
            </Accordion>
        })}
        <FormPopup title={isEnglish?text.editYourCategory:text.H_editYourCategory}
                   formId={"update-category-form"}
                   show={editCategoryPopupIsOpen}
                   closeModalFunction={()=>dispatch(setEditCategoryPopup(false))}
        >
            <EditCategoryForm heatIndex={heatIndex}/>
        </FormPopup>
        </div>
}