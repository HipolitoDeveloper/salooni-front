import React, {useContext, useEffect, useState} from 'react';
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
import {getAllVideos, getVideoByRef} from '../../../services/VideoService';
import * as S from './styled';
import {Image} from 'react-native';
import {
  verifyInformation,
  verifyInformationBeforeInsertion,
} from '../../../services/CloudFunctions';

const SignupTabBar = ({children, state, navigation}) => {
  const {registeredProcedures, cleanProceduresInformation} =
    useContext(ProcedureContext);
  const {
    addPartner,
    registeredPartners,
    cleanPartnersInformation,
    handlePartnerRegisterError,
  } = useContext(PartnerContext);
  const {
    doSignup,
    saveSignupInformation,
    cleanOwnerInformation,
    verifySignup,
    owner,
    handleRegisterError,
  } = useContext(UserContext);

  const [tutorial, setTutorial] = useState({windowVideo: {}, signupVideo: {}});
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

  navigate.addListener(
    'focus',
    () => {
      setIsLoadingSignup(true);
      const getTutorial = async () => {
        Promise.all([getVideoByRef('PAB'), getVideoByRef('CAD')]).then(
          data => {
            setTutorial({windowVideo: data[0], signupVideo: data[1]});
            setIsLoadingSignup(false);
          },
          error => {
            console.error(error);
            setIsLoadingSignup(false);
          },
        );
      };

      getTutorial();
    },
    [],
  );

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

  const saveInformations = async () => {
    setIsLoadingSignup(true);
    const verifications = await verifyInformationBeforeInsertion({
      procedures: registeredProcedures,
      partners: registeredPartners,
      owner: owner,
    });

    if (verifications.length === 0) {
      saveSignupInformation({
        procedures: registeredProcedures,
        partners: registeredPartners,
      }).then(
        ownerEmployee => {
          doSignup(ownerEmployee, '').then(
            user => {
              setIsLoadingSignup(false);
              cleanProceduresInformation();
              cleanOwnerInformation();
              cleanPartnersInformation();
              handleModal(
                'O cadastro foi concluído.',
                true,
                `Realize a entrada como proprietário com o usuário ${user.email}`,
                null,
                () =>
                  navigate.navigate('EntranceStack', {screen: 'SignInOwner'}),
                'IR',
              );
            },
            error => {
              handleModal('', false, ``, () => {}, closeModal);
              setIsLoadingSignup(false);
              setErrorMessage(errorMessages.genericErrorMessage);
            },
          );
        },
        error => {
          setIsLoadingSignup(false);
        },
      );
    } else {
      setIsLoadingSignup(false);
      setErrorMessage(errorMessages.signupErrorMessage);

      verifications.forEach(({item, property, type}) => {
        switch (type) {
          case 'OWN':
            handleRegisterError({item: item, property: property});
            break;
          case 'PRC':
            handlePartnerRegisterError({item: item, property: property});
            break;
          case 'salon':
            handleRegisterError({item: item, property: property});
            break;
        }
      });

    }
  };
  const goWithoutProceduresOrPartners = async () => {
    closeModal();
    await saveInformations();
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

      {errorMessage !== '' && !isConfirmAvailable && (
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
        closeModal={() => setShowInformationModal(false)}>
        <S.ItemInformation>
          <S.VideoTitle>{tutorial.signupVideo.name}</S.VideoTitle>
          <S.WrittenTutorialContent>
            <S.WrittenTutorialText>
              {tutorial.signupVideo.description}
            </S.WrittenTutorialText>
          </S.WrittenTutorialContent>

          <S.VideoContent>
            <Image
              source={{uri: tutorial.signupVideo.url}}
              style={{
                width: 250,
                height: 480,
                borderRadius: 10,
                overlayColor: 'white',
                marginBottom: 20,
              }}
            />
          </S.VideoContent>
        </S.ItemInformation>
        <S.ItemInformation>
          <S.VideoTitle>{tutorial.windowVideo.name}</S.VideoTitle>
          <S.WrittenTutorialContent>
            <S.WrittenTutorialText>
              {tutorial.windowVideo.description}
            </S.WrittenTutorialText>
          </S.WrittenTutorialContent>

          <S.VideoContent>
            <Image
              source={{uri: tutorial.windowVideo.url}}
              style={{
                width: 250,
                height: 480,
                borderRadius: 10,
                overlayColor: 'white',
              }}
            />
          </S.VideoContent>
          {/*<S.CoverWindowChange />*/}
        </S.ItemInformation>
      </InformationModal>
    </>
  );
};

export default SignupTabBar;
