import React from "react";
import {Flex, VStack} from "native-base";

interface ILayoutFormProps {
    children: React.ReactNode;
    backgroundColor?: string;
}

const LayoutForm: React.FC<ILayoutFormProps> = ({children, backgroundColor= 'white.1000'}) => {

    return (
        <VStack display='flex' space='80px' alignItems='center' justifyContent='center' p='30px' mt='20px'>
            {children}
        </VStack>
    )
}

export default LayoutForm
