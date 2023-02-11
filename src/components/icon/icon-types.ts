import { ReactComponent as ArrowUp } from "../../assets/icons/plus.svg";
import { ReactComponent as CloseX } from "../../assets/icons/close_x.svg";
import { ReactComponent as BigDetectAlert } from "../../assets/icons/big_detect-alert.svg";

class Icons {
  readonly plus: ReactSVGComponent = ArrowUp;
  readonly close_x: ReactSVGComponent = CloseX;
  readonly bigDetectAlert: ReactSVGComponent = BigDetectAlert;

}

export const icons = new Icons();
export type iconNames = keyof Icons;
