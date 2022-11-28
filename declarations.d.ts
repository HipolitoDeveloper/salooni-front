declare module "*.svg" {
    import React from 'react';
    import { SvgProps } from "react-native-svg";

    interface Props extends SvgProps {
        borderFill?: string;
    }
    const content: React.FC<Props>;
    export default content;
}
