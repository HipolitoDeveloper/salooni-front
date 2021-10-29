import React from 'react';
import global from '../../../../common/global';
import PartnerForm from '../../../components/huge/PartnerForm';

const SignupPartners = ({route}) => {
  return <PartnerForm isSigningUp={true} color={global.colors.purpleColor} />;
};
export default SignupPartners;
