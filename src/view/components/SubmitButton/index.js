import React from 'react'

import {Content, ContentButton, ContentButtonText} from "./styled";

const SubmitButton = ({text, onPress, width, height, fontSize}) => {
    return (
        <>
            <ContentButton
                onPress={onPress}
                width={width}
                height={height}
            >
                <ContentButtonText    fontSize={fontSize}>
                    {text}
                </ContentButtonText>
            </ContentButton>
        </>

    )
}

export default SubmitButton;