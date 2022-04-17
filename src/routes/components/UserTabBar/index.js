import React, {useContext} from 'react';

import Notification from '../../../view/components/small/Notification';
import Colors from "../../../common/style/Colors";
import { useUser } from "../../../hooks";
import TopTabBar from "../../../view/components/huge/TopTabBar";

const UserTabBar = ({children, state, navigation}) => {
  const {isOwner} = useUser()
  let pages = [
    {screen: 'Profile', name: 'Perfil'},
    {screen: 'Finance', name: 'Financeiro'},
    {screen: 'Videos', name: 'Vídeos'},
  ];

  const goBack = () => {
    navigation.navigate('TabStack', {
      screen: 'Schedules',
      params: {calendarViewState: true},
    });
  };

  return (
    <>
      {/*<Notification />*/}
      <TopTabBar
        showSignoutButton={true}
        isOwner={isOwner}
        disableButtons={true}
        backButton={true}
        color={Colors.PURPLE}
        pages={pages}
        state={state}
        navigation={navigation}
        onCancel={goBack}
      />
    </>
  );
};
export default UserTabBar;
