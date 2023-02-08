import {iconNames} from "../icon/icon-types";

export interface Props {
  title?: string;
  size?: "sm" | "lg";
  color?: "primary" | "secondary" | "tertiary" | "header" | "dark" | "alert" | "delete" | "white";
  iconKey?: iconNames;
  functionAction: <T>(args?: T) => unknown;
  isDisable?: boolean;
  extendedIcon?: iconNames;
  extendedFunction?: <T>(args?: T) => unknown;
  selected?: boolean;
  width?: number | string;
  fontSize?: number | string;
  form?:string
  type?:"button" | "submit" | "reset" | undefined
}
