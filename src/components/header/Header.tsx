import './Header.scss'
import React from "react";
import {text} from "../../utils/dictionaryManagement";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {setIsEnglish} from "../../store/global.slice";

export const Header = () => {
    const dispatch = useAppDispatch();
    const {isEnglish} = useAppSelector(state => state.global);
const updateLanguage=()=>{
    dispatch(setIsEnglish(!isEnglish))
}
    return <div style={{direction:isEnglish?"rtl":"ltr"}} className={"header-container"}>
        <div className={"left-side"} ><span className={"typography-input language-text"} onClick={updateLanguage}>{isEnglish?text.english:text.hebrew}</span></div>
        <div className={"typography-main-header main_title"}>{isEnglish?text.manageYourMinisite:text.H_manageYourMinisite}</div>
        <div className={"typography-input right-side"}>{isEnglish?text.helloClient:text.H_helloClient}</div>
    </div>
}
