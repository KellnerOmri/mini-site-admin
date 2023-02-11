import "./Button.scss";
import React from "react";
import {Props} from "./props.model";
import {Icon} from "../icon/Icon";

export const Button: React.FC<Props> = ({
                                            title,
                                            size = "sm",
                                            color = "primary",
                                            iconKey,
                                            functionAction,
                                            isDisable = false,
                                            extendedIcon,
                                            extendedFunction,
                                            selected = false,
                                            width = "auto",
                                            height = "auto",
                                            fontSize = 14,
                                            form = "",
                                            type = "button"
                                        }) => {
    return (
        <button
            type={type}
            form={form}
            onClick={functionAction}
            disabled={isDisable}
            className={`button-container ${size} ${color} ${isDisable ? "disabled" : ""} ${selected ? "selected" : ""}`}>
            {iconKey && <Icon name={iconKey}></Icon>}
            {title && (
                <span style={{width,height, fontSize}} className="button-title typography-input">
          {title}
        </span>
            )}
            {extendedIcon && (
                // TODO: move extended from the button and create one more button
                <div className="extended-container" onClick={extendedFunction}>
                    <Icon name={extendedIcon}></Icon>
                </div>
            )}
        </button>
    );
};
