import {IButton} from "../form/Button";

export interface IAlertDialog {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
    title: string;
    description: string;
    buttons: IButton[]

}
