import { ReactComponent as ArrowUp } from "../../assets/icons/plus.svg";
import { ReactComponent as CloseX } from "../../assets/icons/close_x.svg";

class Icons {
  readonly plus: ReactSVGComponent = ArrowUp;
  readonly close_x: ReactSVGComponent = CloseX;
}

export const icons = new Icons();
export type iconNames = keyof Icons;
