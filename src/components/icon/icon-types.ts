import { ReactComponent as ArrowUp } from "../../assets/icons/plus.svg";
import { ReactComponent as CloseX } from "../../assets/icons/close_x.svg";
import { ReactComponent as BigDetectAlert } from "../../assets/icons/big_detect-alert.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import { ReactComponent as UploadFile } from "../../assets/icons/upload_file.svg";

class Icons {
  readonly plus: ReactSVGComponent = ArrowUp;
  readonly close_x: ReactSVGComponent = CloseX;
  readonly bigDetectAlert: ReactSVGComponent = BigDetectAlert;
  readonly editIcon: ReactSVGComponent = EditIcon;
  readonly uploadFile: ReactSVGComponent = UploadFile;
}

export const icons = new Icons();
export type iconNames = keyof Icons;
