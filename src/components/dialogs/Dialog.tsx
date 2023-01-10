import Button, {IButton} from "../form/Button";
import {AlertDialog as BaseAlertDialog, Text} from "native-base";
import React, {useRef} from "react";

export interface IDialog {
    isOpen: boolean;
    onClose: () => void;
    onOpen?: () => void;
    title: string;
    buttons?: IButton[]
    children: React.ReactNode
}

export const dialogUsefulButtons = {
    'yesOrNo': [
        {variant: 'solid', children: <Text color='white.1000' fontWeight='bold'>Sim</Text>, name: "confirmButton", backgroundColor: 'green.1000'},
        {variant: 'solid', children: <Text color='white.1000' fontWeight='bold'>Não</Text>, name: "refuseButton", backgroundColor: 'red.1000'}
    ]
}

const Dialog = ({isOpen, onClose, children, buttons, title}) => {

    const cancelRef = useRef(null);

    return (
        <BaseAlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose} avoidKeyboard={true}
                         isKeyboardDismissable={true}
        >
            <BaseAlertDialog.Content>
                <BaseAlertDialog.CloseButton/>
                <BaseAlertDialog.Header>{title}</BaseAlertDialog.Header>
                <BaseAlertDialog.Body>
                    {children}
                </BaseAlertDialog.Body>

                {buttons.length > 0 && (
                    <BaseAlertDialog.Footer>
                        {buttons.map(({variant, onPress, children, name, ...props}) => (
                            <Button key={name} variant={variant} onPress={onPress ?? onClose} marginLeft={5} {...props}>
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
