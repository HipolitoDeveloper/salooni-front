import React from "react";
import Dialog from "@components/dialogs/Dialog";
import {CircleIcon, HStack, Text} from "native-base";
import {application} from "@common/typograph";
import {IButton} from "@components/form/Button";

export interface ISuccessDialog {
    isOpen?: boolean;
    onClose?: () => void;
    onOpen?: () => void;
    description?: string;
    buttons?:  IButton[]
}

const SuccessDialog: React.FC<ISuccessDialog> = ({isOpen, onClose, onOpen, description, buttons= []}) => {

    return (
        <Dialog isOpen={isOpen} onClose={onClose} buttons={buttons} title={application.SUCCESS}>
                <HStack alignItems='center' space='10px'>
                    <Text>
                        {description}
                    </Text>
                </HStack>
        </Dialog>
    )

}

export default SuccessDialog
