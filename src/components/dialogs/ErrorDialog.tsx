import React from "react";
import AlertDialog from "@components/layout/AlertDialog";
import {CircleIcon, HStack, Text} from "native-base";

interface IErrorDialog {
    messages: string[];
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;

}

const ErrorDialog: React.FC<IErrorDialog> = ({messages, isOpen, onClose, onOpen}) => {

    return (
        <AlertDialog isOpen={isOpen} onClose={onClose} buttons={[

        ]}>
            {messages?.length && messages?.map(message => (
                <HStack alignItems='center' space='10px'>
                    <CircleIcon size='10px' color='purple.1000'/>
                    <Text>
                        {message}
                    </Text>
                </HStack>
            ))}
        </AlertDialog>
    )

}

export default ErrorDialog
