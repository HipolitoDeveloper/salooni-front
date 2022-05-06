import React, {useContext, useEffect, useState} from 'react';

import {getFinanceInformation} from '../../../../services/CloudService';
import ComingSoon from "../../../components/small/ComingSoon";
import {useUser} from "../../../../hooks";


const Finance = () => {
    const [data, setData] = useState({
        graphic: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        salonFinances: 0,
        partnerFinances: 0
    });
    const [isLoading, setIsLoading] = useState(false)

    const {currentUser} = useUser();

    useEffect(() => {
        setIsLoading(true);
        const getData = async () => {
            await getFinanceInformation(currentUser.idSalon).then(
                data => {
                    setData({
                        graphic: data.finances.map(finance => finance.monthTotalProfit),
                        salonFinances: data.totalSalonFinances,
                        partnerFinances: data.totalPartnerFinances
                    });
                    setIsLoading(false);
                },
                error => {
                    console.error(error);
                    setIsLoading(false);
                },
            );
        };

        getData();

    }, [])


    return (
        <ComingSoon/>
        // <S.Container>
        //     <S.AuxiliarTitle>
        //         Faturamento anual
        //     </S.AuxiliarTitle>
        //     <LineChart
        //         data={{
        //             labels: [
        //                 "Jan.",
        //                 "Fev.",
        //                 "Mar",
        //                 "Abr",
        //                 "Mai",
        //                 "Jun",
        //                 "Jul.",
        //                 "Out",
        //                 "Set.",
        //                 "Out.",
        //                 "Nov.",
        //                 "Dec.",
        //             ],
        //             datasets: [
        //                 {
        //                     data: data.graphic
        //                 }
        //             ]
        //         }}
        //         width={Dimensions.get("window").width * 0.95} // from react-native
        //         height={220}
        //         yAxisLabel="R$"
        //         yAxisSuffix=""
        //         yAxisInterval={1} // optional, defaults to 1
        //         chartConfig={{
        //             backgroundColor: Colors.LIGHT_GREY,
        //             backgroundGradientFrom: Colors.PURPLE,
        //             backgroundGradientTo: "#ba86cc",
        //             decimalPlaces: 1, // optional, defaults to 2dp
        //             color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        //             labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        //             style: {
        //                 borderRadius: 5,
        //                 elevation: 10,
        //                 fontSize: 6
        //             },
        //             propsForDots: {
        //                 r: "3",
        //                 strokeWidth: "1",
        //                 stroke: "#ba86cc",
        //                 padding: 100
        //
        //             },
        //             barPercentage: 0.5,
        //         }}
        //         bezier
        //         style={{
        //             marginVertical: 8,
        //             borderRadius: 10,
        //             elevation: 10
        //
        //         }}
        //     />
        //     <S.InformationBox>
        //         <S.AuxiliarTitle>
        //             Parceiros
        //         </S.AuxiliarTitle>
        //         <S.AuxiliarCard>
        //             <S.AuxiliarText>
        //                 Faturamento de  R${data.partnerFinances}
        //             </S.AuxiliarText>
        //         </S.AuxiliarCard>
        //     </S.InformationBox>
        //
        //     <S.InformationBox>
        //         <S.AuxiliarTitle>
        //             Salão
        //         </S.AuxiliarTitle>
        //         <S.AuxiliarCard>
        //             <S.AuxiliarText>
        //                 Faturamento de  R${data.salonFinances}
        //             </S.AuxiliarText>
        //         </S.AuxiliarCard>
        //     </S.InformationBox>
        //
        //
        //
        //
        //     <Loading isLoading={isLoading} color={Colors.PURPLE} />
        //
        // </S.Container>
    )
}

export default Finance;
