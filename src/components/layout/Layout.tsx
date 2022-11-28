import React from "react";
import {Flex} from "native-base";

interface ILayoutProps {
    children: React.ReactNode;
    backgroundColor?: string;
}

const Layout: React.FC<ILayoutProps> = ({children, backgroundColor= 'white.1000'}) => {

    return (
        <Flex flex={1} bg={backgroundColor} pt='50px'>
            {children}
        </Flex>
    )
}

export default Layout
