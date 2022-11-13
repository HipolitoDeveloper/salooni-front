import React from "react";
import {Flex} from "native-base";

interface ILayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<ILayoutProps> = ({children}) => {

    return (
        <Flex flex={1} bg='white.1000' pt='50px'>
            {children}
        </Flex>
    )
}

export default Layout
