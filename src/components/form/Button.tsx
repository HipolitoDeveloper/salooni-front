import {Button as BaseButton, IButtonProps} from "native-base";
import React from "react";


export interface IButton extends IButtonProps {

}

const Button: React.FC<IButton> = ({onPress, children, style, size, ...props}) => {

    return (
        <BaseButton onPress={onPress} size={size} style={style} {...props}>
            {children}
        </BaseButton>
    )
}

export default Button
