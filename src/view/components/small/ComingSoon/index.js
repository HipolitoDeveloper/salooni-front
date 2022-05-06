import React from 'react';
import * as S from './styled'
import Icon from "react-native-vector-icons/Ionicons";
import Colors from "../../../../common/style/Colors";


const ComingSoon = () => {

    return (
        <S.Container>
            <S.Description>
                Espaço em construção! Acompanhe nossas novidades no site.
            </S.Description>
            <Icon name={"construct"} size={40} color={Colors.PURPLE} />
        </S.Container>
    )
}

export default ComingSoon
