import {useNavigation} from '@react-navigation/native';
import PartnerForm from '../../../../components/huge/PartnerForm';
import React from 'react';
import global from '../../../../../common/global';
import Notification from '../../../../components/small/Notification';

const PartnerRegister = ({route}) => {
  const navigate = useNavigation();

  return (
    <>
      <PartnerForm
        route={route}
        goBack={() => navigate.navigate('Partners')}
        color={global.colors.greenColor}
      />
    </>
  );
};

export default PartnerRegister;
