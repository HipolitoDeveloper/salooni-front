import {Box, CheckIcon, CloseIcon, HStack, Text, VStack} from "native-base";
import React from "react";
import Button from "@components/form/Button";
import SalooniLogo from "@assets/app/svg/salooniSVG.svg";

interface IActionHeader {
    onConfirm(): void;

    onCancel(): void;

    title: string;
    color: 'green.1000' | 'purple.1000' | 'blue.1000'
}

const ActionHeader: React.FC<IActionHeader> = ({
                                                   onConfirm,
                                                   onCancel,
                                                   title,
                                                   color
                                               }) => {

    return (
        <VStack alignItems='center' space='20px' borderBottomStyle='solid' borderBottomWidth='2px'
                borderBottomColor='purple.1000'>
            <HStack w='100%' alignItems='center' justifyContent={'space-around'}>
                <Button onPress={onCancel} variant='circle'>
                    <CloseIcon color='purple.1000'/>
                </Button>

                <SalooniLogo fill={'#A177AF'}
                             borderFill={'#A177AF'}
                             width={60}
                             height={60}/>
                <Button onPress={onConfirm} variant='circle' backgroundColor='purple.1000'>
                    <CheckIcon size='20px'
                               color='white.1000'/>
                </Button>


            </HStack>
            <Box borderBottomStyle='solid' borderBottomWidth='5px' borderBottomColor='purple.1000'
                 borderTopLeftRadius='1px' borderTopRightRadius='1px'>
                <Text color='purple.1000'>{title}</Text>
            </Box>

        </VStack>

    )

}

export default ActionHeader
