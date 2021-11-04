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
import InformationModal from '../../../view/components/small/InformationModal';

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
    cancelMethod: () => {},
  });
  const [showInformationModal, setShowInformationModal] = useState({
    state: true,
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

  const handleModal = (
    title,
    isShowing,
    text,
    method,
    cancelMethod,
    cancelTitle,
  ) => {
    setShowAlertModal({
      isShowing: isShowing,
      text: text,
      title: title,
      method: method,
      cancelMethod: cancelMethod,
      cancelTitle: cancelTitle,
    });
  };

  const closeModal = () => {
    setShowAlertModal({
      isShowing: false,
      text: 'text',
      title: 'title',
      method: () => {},
      cancelMethod: () => closeModal(),
    });
  };

  const verifyInformationToGo = () => {
    setErrorMessage('');
    const verifier = verifySignup({
      procedures: registeredProcedures,
      partners: registeredPartners,
    });

    if (verifier.isOk && verifier.showReconfirmModal) {
      handleModal(
        'Atenção',
        true,
        verifier.errorMessage,
        () => goWithoutProceduresOrPartners(),
        closeModal,
        'NÃO',
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
              null,
              () => navigate.navigate('EntranceStack', {screen: 'SignInOwner'}),
              'IR',
            );
          },
          error => {
            handleModal('', false, ``, () => {}, closeModal);
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
    closeModal();
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
        title={showAlertModal.title}
        onClose={showAlertModal.cancelMethod}
        cancelTitle={showAlertModal.cancelTitle}
      />

      <InformationModal
        modalState={showInformationModal}
        closeModal={() => setShowInformationModal(false)}></InformationModal>
    </>
  );
};

export default SignupTabBar;
