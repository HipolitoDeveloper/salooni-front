import React from "react";
import Layout from "../../components/layout/Layout";
import {Center, Pressable, Text, VStack} from "native-base";
import {entrance} from "@common/typograph";

import SalooniLogo from "@assets/app/svg/salooniSVG.svg"
import Owner from "@assets/app/svg/ownerSVG.svg"
import Partner from "@assets/app/svg/partnerSVG.svg"
import {useNavigation} from "@react-navigation/native";
import {TEntranceStack} from "../../routes/entrance.stack";

const EntranceScreen: React.FC = () => {
    const {navigate} = useNavigation<TEntranceStack>();

    return (
        <Layout backgroundColor='purple.1000'>
            <VStack space={'80px'} mt='50px'>

                <Center>
                    <SalooniLogo fill={'#FFF'}
                                 width={100}
                                 height={100}/>
                    <Text mt="20px" color='white.1000' fontSize='20px'>{entrance.WELCOME_MESSAGE}</Text>
                </Center>

                <Pressable onPress={() => navigate('OwnerSignin')}>
                    <Center>
                        <Owner fill={'#A177AF'}
                               borderFill={'white'}
                               width={120}
                               height={120}/>
                        <Text mt="20px" color='white.1000' fontSize='20px'>{entrance.OWNER}</Text>
                    </Center>
                </Pressable>

                <Pressable onPress={() => navigate('EmployeeSignin')}>
                    <Center>
                        <Partner fill={'#A177AF'}
                                 borderFill={'white'}
                                 width={120}
                                 height={120}/>
                        <Text mt="20px" color='white.1000' fontSize='20px'>{entrance.EMPLOYEE}</Text>
                    </Center>
                </Pressable>

            </VStack>

        </Layout>
    )
}

export default EntranceScreen
