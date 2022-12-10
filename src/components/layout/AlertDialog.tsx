import Button, {IButton} from "../form/Button";
import { AlertDialog as BaseAlertDialog} from "native-base";
import React, {useRef} from "react";

export interface IAlertDialog {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
    title: string;
    description: string;
    buttons: IButton[]
    children?: React.ReactNode
}

const AlertDialog = ({isOpen, onClose, children, buttons}) => {

    const cancelRef = useRef(null);

    return(
        <BaseAlertDialog  leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
            <BaseAlertDialog.Content>
                <BaseAlertDialog.CloseButton />
                <BaseAlertDialog.Header>Atenção</BaseAlertDialog.Header>
                <BaseAlertDialog.Body>
                    {children}
                </BaseAlertDialog.Body>
                <BaseAlertDialog.Footer>
                    {buttons.map(({variant, onPress, children, name}) => (
                        <Button key={name} variant={variant} onPress={onPress} >
                            {children}
                        </Button>
                    ))}
                </BaseAlertDialog.Footer>
            </BaseAlertDialog.Content>
        </BaseAlertDialog>
    )
}

export default AlertDialog
