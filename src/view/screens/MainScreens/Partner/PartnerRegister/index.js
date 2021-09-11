import React, {useContext, useEffect, useState} from 'react';
import * as S from './styled';
import Input from '../../../../components/Input';
import SubmitButton from '../../../../components/SubmitButton';
import global from '../../../../../common/global';
import ErrorMessage from '../../../../components/ErrorMessage';
import {useNavigation} from '@react-navigation/native';
import errorMessages from '../../../../../common/errorMessages';
import AlertModal from '../../../../components/AlertModal';
import {ActivityIndicator, View} from 'react-native';
import BackButton from '../../../../components/BackButton';
import {UserContext} from '../../../../../contexts/User/UserContext';
import {getSalonById} from '../../../../../services/SalonService';
import Icon from 'react-native-vector-icons/Ionicons';
import {PartnerContext} from '../../../../../contexts/Partner/PartnerContext';
import SelectBox from 'react-native-multi-selectbox';
import {xorBy} from 'lodash';
import {ProcedureContext} from '../../../../../contexts/Procedure/ProcedureContext';
import {
  ClientParseObjectToClientObject,
  PartnerParseObjectToPartnerObject,
} from '../../../../../common/conversor';
import {getProcedureEmployeeByFuncFK} from '../../../../../services/ProcedureEmployeeService';

const PartnerRegister = ({route}) => {
  const {loadAllProcedures, dropdownProcedures} = useContext(ProcedureContext);

  const [partner, setPartner] = useState({
    procedures: [],
  });
  const {
    addPartner,
    editPartner,
    registeredPartners,
    savePartner,
    cleanRegisteredPartners,
    updatePartnerInView,
    updatePartner,
    deletePartner,
    deletePartnerInView,
  } = useContext(PartnerContext);

  const {currentUser} = useContext(UserContext);

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState({
    isShowing: false,
    text: '',
  });

  const [partnerProcedures, setPartnerProcedures] = useState([]);

  const navigate = useNavigation();

  navigate.addListener('focus', async () => {
    const partnerInView = route.params?.partner
      ? PartnerParseObjectToPartnerObject(route.params?.partner)
      : {};

    if (Object.keys(partnerInView).length !== 0) {
      const partnerProcedures = await getProcedureEmployeeByFuncFK(
        partnerInView.objectId,
        false,
      );

      setPartnerProcedures(partnerProcedures);
      partnerInView.procedures = [];

      partnerProcedures.forEach(pp => {
        partnerInView.procedures.push({
          id: pp.IdProcFK.objectId,
          item: pp.IdProcFK.Nome,
        });
      });

      setPartner(partnerInView);
      setIsEditing(true);
    }
  });

  useEffect(() => {
    setIsLoading(true);
    const getAllProcedures = async () => {
      await loadAllProcedures(currentUser.idSalon).then(
        () => setIsLoading(false),
        error => {
          console.log(error);
          setIsLoading(false);
        },
      );
      setIsLoading(false);
    };
    getAllProcedures();
  }, []);

  useEffect(() => {
    registeredPartners.forEach(partner => (partner.isInView = false));
  }, []);

  const handleChange = (text, rawText, name) => {
    setPartner({
      ...partner,
      [name]: text,
    });
  };

  const handleMultiSelect = item => {
    let selectedItem = xorBy(partner.procedures, [item], 'item');

    setPartner({
      ...partner,
      ['procedures']: selectedItem,
    });
  };

  const handleModal = (isShowing, text) => {
    setShowAlertModal({isShowing: isShowing, text: text});
  };

  const chooseAddPartnerMethod = async () => {
    const {isInView, indexInView} = {...partner};

    if (verifyInformation() && isInView) {
      partner.isInView = false;
      editPartner({partner: partner, index: indexInView});
      setErrorMessage('');
      setPartner({procedures: []});
    }

    if (verifyInformation() && !isInView) {
      partner.IdSalaoFK = await getSalonById(currentUser.idSalon, true);
      addPartner(partner);
      setErrorMessage('');
      setPartner({procedures: []});
    }
  };

  const handlePartner = (partner, index) => {
    updatePartnerInView(index);
    partner.isInView = !partner.isInView;
    partner.indexInView = index;

    setPartner(partner);

    if (!verifyIfIsEditing()) {
      setPartner({procedures: []});
    }
  };

  const verifyIfIsEditing = () => {
    return registeredPartners.some(partner => partner.isInView === true);
  };

  const savePartners = () => {
    setIsLoading(true);

    if (verifyInformationToGo()) {
      savePartner(currentUser.idSalon).then(
        () => {
          setIsLoading(false);
          cleanRegisteredPartners();
          navigate.navigate('Partners');
          setErrorMessage('');
          setPartner({procedures: []});
        },
        error => {
          setIsLoading(false);
          console.log(error);
        },
      );
    }
  };

  const updatePartners = () => {
    setIsLoading(true);
    updatePartner({
      partner: partner,
      partnerProcedures: partnerProcedures,
    }).then(
      async () => {
        setIsLoading(false);
        navigate.navigate('Partners');
        setErrorMessage('');
        setPartner({procedures: []});
      },
      error => {
        setIsLoading(false);
        console.log(error);
      },
    );
  };

  const deletePartners = () => {
    setIsLoading(true);
    deletePartner(partner).then(
      () => {
        setIsLoading(false);
        navigate.navigate('Partners');
        setErrorMessage('');
        setPartner({procedures: []});
      },
      error => {
        setIsLoading(false);
        console.log(error);
      },
    );
  };

  const verifyInformationToGo = () => {
    let ableToGo = true;

    if (Object.keys(partner).length === 3) {
      addPartner(partner);
      return ableToGo;
    } else if (registeredPartners.length === 0) {
      ableToGo = false;

      setErrorMessage(errorMessages.noClientMessage);
    }
    setIsLoading(false);
    return ableToGo;
  };

  const verifyInformation = () => {
    let ableToGo = true;
    let errorMessage = '';

    if (
      partner === {} ||
      partner.name === undefined ||
      partner.name === '' ||
      partner.email === undefined ||
      partner.email === '' ||
      partner.tel === undefined ||
      partner.tel === ''
    ) {
      ableToGo = false;
      errorMessage = errorMessages.partnerMessage;
    }

    setErrorMessage(errorMessage);
    return ableToGo;
  };

  const loadBoxInformation = () =>
    registeredPartners.map((partner, index) => (
      <S.BoxContent onPress={() => handlePartner(partner, index)} key={index}>
        <S.BoxText isInView={partner.isInView}>{partner.name}</S.BoxText>
      </S.BoxContent>
    ));

  return (
    <S.Container>
      <S.Content>
        <S.HeaderContent>
          <BackButton
            positionTop={'23px'}
            positionLeft={'-5px'}
            buttonColor={`${global.colors.lightBlueColor}`}
            onPress={() => navigate.navigate('Partners')}
          />
          <S.HeaderTitle>Registro de Parceiros</S.HeaderTitle>
        </S.HeaderContent>
        <S.BodyContent>
          <Input
            handleChange={handleChange}
            name={'name'}
            placeholder={'Nome*'}
            value={partner.name}
            width={'80%'}
            keyboard={'default'}
            isSecureTextEntry={false}
            fontSize={18}
            disabled={false}
            mask="none"
            borderBottomColor={global.colors.lightBlueColor}
          />

          <Input
            handleChange={handleChange}
            name={'email'}
            placeholder={'E-mail*'}
            value={partner.email}
            width={'80%'}
            keyboard={'email-address'}
            isSecureTextEntry={false}
            fontSize={18}
            disabled={false}
            mask="none"
            borderBottomColor={global.colors.lightBlueColor}
          />

          <Input
            handleChange={handleChange}
            name={'tel'}
            placeholder={'Celular*'}
            value={partner.tel}
            width={'80%'}
            keyboard={'numeric'}
            isSecureTextEntry={false}
            fontSize={18}
            disabled={false}
            mask={'(99) 99999-9999'}
            borderBottomColor={global.colors.lightBlueColor}
          />

          <Input
            handleChange={handleChange}
            name={'cnpj'}
            placeholder={'CNPJ*'}
            value={partner.cnpj}
            width={'80%'}
            keyboard={'numeric'}
            isSecureTextEntry={false}
            fontSize={18}
            disabled={false}
            mask={'99.999.999/9999-99'}
            borderBottomColor={global.colors.lightBlueColor}
          />

          <View
            style={{
              width: '80%',
              marginTop: 20,
            }}>
            <SelectBox
              options={dropdownProcedures}
              selectedValues={partner.procedures}
              onMultiSelect={item => handleMultiSelect(item)}
              onTapClose={item => handleMultiSelect(item)}
              isMulti
            />
          </View>

          {/*<S.InformationContent isEditing={isEditing}>*/}
          {/*  /!*<Input*!/*/}
          {/*  /!*  handleChange={handleChange}*!/*/}
          {/*  /!*  name={'tel2'}*!/*/}
          {/*  /!*  placeholder={'Telefone'}*!/*/}
          {/*  /!*  value={partner.tel2}*!/*/}
          {/*  /!*  width={'85%'}*!/*/}
          {/*  /!*  keyboard={'numeric'}*!/*/}
          {/*  /!*  isSecureTextEntry={false}*!/*/}
          {/*  /!*  fontSize={18}*!/*/}
          {/*  /!*  disabled={false}*!/*/}
          {/*  /!*  mask={'(99) 99999-9999'}*!/*/}
          {/*  /!*/
          /*/}
            {/*</S.InformationContent>*/}

          <S.ButtonsContent>
            {!isEditing && (
              <SubmitButton
                text={partner.isInView ? 'Editar' : 'Adicionar'}
                onPress={() => chooseAddPartnerMethod()}
                width={'40%'}
                height={'30px'}
                fontSize={'18px'}
                buttonColor={`${global.colors.lightBlueColor}`}
              />
            )}

            {partner.isInView && (
              <S.DeleteButton
                onPress={() => {
                  deletePartnerInView(partner);
                  setPartner({procedures: []});
                }}>
                <Icon name="trash" size={17} />
              </S.DeleteButton>
            )}
          </S.ButtonsContent>
          {!isEditing && (
            <S.RegisteredProceduresContent>
              <S.RegisteredProceduresBoxTitle>
                Já Cadastrados
              </S.RegisteredProceduresBoxTitle>
              <S.RegisteredProceduresBox>
                {loadBoxInformation()}
              </S.RegisteredProceduresBox>
            </S.RegisteredProceduresContent>
          )}
        </S.BodyContent>
        <S.FooterContent>
          <S.AddButtonContent>
            {errorMessage !== '' && (
              <ErrorMessage
                text={errorMessage}
                width={'70%'}
                textColor={`${global.colors.lightBlueColor}`}
              />
            )}

            {isLoading && (
              <S.LoadingContent>
                <ActivityIndicator
                  size="large"
                  color={global.colors.lightBlueColor}
                />
              </S.LoadingContent>
            )}
          </S.AddButtonContent>
          <S.SubmitButtonContent>
            <SubmitButton
              disabled={verifyIfIsEditing()}
              text={'Salvar'}
              onPress={() => (!isEditing ? savePartners() : updatePartners())}
              width={'40%'}
              height={'50px'}
              fontSize={'18px'}
              buttonColor={`${global.colors.lightBlueColor}`}
            />
            {isEditing && (
              <S.DeleteButton
                onPress={() => handleModal(true, errorMessages.deleteMessage)}>
                <Icon name="trash" size={17} />
              </S.DeleteButton>
            )}
          </S.SubmitButtonContent>
        </S.FooterContent>
      </S.Content>

      <AlertModal
        text={showAlertModal.text}
        isVisible={showAlertModal.isShowing}
        onClose={() => {
          handleModal(false, '', false);
        }}
        onOk={() => {
          deletePartners(partner);
        }}
        title={'Atenção.'}
      />
    </S.Container>
  );
};

export default PartnerRegister;
