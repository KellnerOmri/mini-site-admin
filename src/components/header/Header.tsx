import './Header.css'
import React from "react";
import {text} from "../../utils/dictionaryManagement";

export const Header = () => {
    return <div className={"header-container"}>
        <span className={"typography-main-header main_title"}>{text.manageYourMinisite}</span>
    </div>
}
