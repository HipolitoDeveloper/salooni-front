import Button, {IButton} from "../form/Button";
import { AlertDialog as BaseAlertDialog} from "native-base";
import React, {useRef} from "react";

export interface IDialog {
    isOpen: boolean;
    onClose: () => void;
    onOpen?: () => void;
    title: string;
    buttons?: IButton[]
    children: React.ReactNode
}

const Dialog = ({isOpen, onClose, children, buttons, title}) => {

    const cancelRef = useRef(null);

    return(
        <BaseAlertDialog  leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
            <BaseAlertDialog.Content>
                <BaseAlertDialog.CloseButton />
                <BaseAlertDialog.Header>{title}</BaseAlertDialog.Header>
                <BaseAlertDialog.Body>
                    {children}
                </BaseAlertDialog.Body>

                {buttons.length > 0 && (
                    <BaseAlertDialog.Footer>
                        {buttons.map(({variant, onPress, children, name}) => (
                            <Button key={name} variant={variant} onPress={onPress} >
                                {children}
                            </Button>
                        ))}
                    </BaseAlertDialog.Footer>
                )}

            </BaseAlertDialog.Content>
        </BaseAlertDialog>
    )
}

export default Dialog
