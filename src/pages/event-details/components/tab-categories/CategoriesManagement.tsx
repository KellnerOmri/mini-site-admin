import './CategoriesManagement.scss'
import React from "react";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import {useAppSelector} from "../../../../app/hooks";
import {AddCategoryToList} from "./components/AddCategoryToList";
export const CategoriesManagement=()=>{
    const {isEnglish} = useAppSelector(state => state.global);
    const { heats} = useAppSelector(state => state.data);

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
                    <AddCategoryToList heat={heat} index={index}/>
                </AccordionDetails>
            </Accordion>
        })}
        </div>
}