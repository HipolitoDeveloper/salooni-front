import React, {useContext, useState} from 'react';
import global from '../../../common/global';

import TopTabBar from '../../patterns/TopTabBar';
import {useNavigation} from '@react-navigation/native';
import errorMessages from '../../../common/errorMessages';
import {ProcedureContext} from '../../../contexts/Procedure/ProcedureContext';
import {PartnerContext} from '../../../contexts/Partner/PartnerContext';
import {UserContext} from '../../../contexts/User/UserContext';
import AlertModal from '../../../view/components/small/AlertModal';
import ErrorMessage from '../../../view/components/small/ErrorMessage';

const SignupTabBar = ({children, state, navigation}) => {
  const {
    registeredProcedures,
    cleanProceduresInformation,
    cleanRegisteredProcedures,
  } = useContext(ProcedureContext);
  const {addPartner, registeredPartners, cleanPartnersInformation} =
    useContext(PartnerContext);
  const {doSignup, saveSignupInformation, cleanOwnerInformation, verifySignup} =
    useContext(UserContext);

  const [isLoadingSignup, setIsLoadingSignup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showAlertModal, setShowAlertModal] = useState({
    isShowing: false,
    text: '',
    method: () => {},
  });

  const pages = [
    {screen: 'SignupOwners', name: 'Salão'},
    {screen: 'SignupProcedures', name: 'Procedimentos'},
    {screen: 'SignupPartners', name: 'Parceiros'},
  ];
  const navigate = useNavigation();

  const isConfirmAvailable = verifySignup({
    procedures: registeredProcedures,
    partners: registeredPartners,
  }).isOk;

  const handleModal = (title, isShowing, text, method) => {
    setShowAlertModal({
      isShowing: isShowing,
      text: text,
      title: title,
      method: method,
    });
  };

  const verifyInformationToGo = () => {
    setErrorMessage('');
    const verifier = verifySignup({
      procedures: registeredProcedures,
      partners: registeredPartners,
    });

    if (verifier.isOk && verifier.showReconfirmModal) {
      handleModal('Atenção', true, verifier.errorMessage, () =>
        goWithoutProceduresOrPartners(),
      );
    } else if (verifier.isOk && !verifier.showReconfirmModal) {
      saveInformations();
    } else {
      setErrorMessage(verifier.errorMessage);
    }
  };

  const saveInformations = () => {
    setIsLoadingSignup(true);

    saveSignupInformation({
      procedures: registeredProcedures,
      partners: registeredPartners,
    }).then(
      ownerEmployee => {
        doSignup(ownerEmployee, '').then(
          user => {
            setIsLoadingSignup(false);
            cleanRegisteredProcedures();
            cleanProceduresInformation();
            cleanOwnerInformation();
            cleanPartnersInformation();
            handleModal(
              'O cadastro foi concluído.',
              true,
              `Realize a entrada como proprietário com o usuário ${user.email}`,
              () => goBack(),
            );
          },
          error => {
            handleModal('', true, ``, () => {});
            setIsLoadingSignup(false);
            setErrorMessage(errorMessages.salonWarningMessage);
          },
        );
      },
      error => {
        console.error(error);
        setIsLoadingSignup(false);
        setErrorMessage(errorMessages.userWarningMessage);
      },
    );
  };
  const goWithoutProceduresOrPartners = () => {
    handleModal('', false, '', () => {});
    saveInformations();
  };

  const goBack = () => {
    navigate.navigate('EntranceStack', {screen: 'SignInOwner'});
  };

  return (
    <>
      <TopTabBar
        isLoading={isLoadingSignup}
        color={global.colors.purpleColor}
        pages={pages}
        state={state}
        navigation={navigation}
        onConfirm={verifyInformationToGo}
        onCancel={goBack}
        isConfirmAvailable={isConfirmAvailable}
      />

      {errorMessage !== '' && (
        <ErrorMessage
          text={errorMessage}
          width={'70%'}
          textColor={`${global.colors.purpleColor}`}
        />
      )}

      <AlertModal
        text={showAlertModal.text}
        isVisible={showAlertModal.isShowing}
        onOk={showAlertModal.method}
        onClose={() => handleModal('', false, ``, () => {})}
        title={showAlertModal.title}
      />
    </>
  );
};

export default SignupTabBar;
