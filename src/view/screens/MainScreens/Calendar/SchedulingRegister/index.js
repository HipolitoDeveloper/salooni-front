import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';

import {buildDropdown, dateConverter} from '../../../../../factory/common';
import * as S from './styled';
import BackButton from '../../../../components/BackButton';
import global from '../../../../../common/global';
import {useNavigation} from '@react-navigation/native';
import DatePicker from 'react-native-datepicker';
import SelectBox from 'react-native-multi-selectbox';
import {ProcedureContext} from '../../../../../contexts/Procedure/ProcedureContext';
import {xorBy} from 'lodash';
import AutocompleteInput from '../../../../components/AutocompleteInput';
import SubmitButton from '../../../../components/SubmitButton';
import errorMessages from '../../../../../common/errorMessages';
import Icon from 'react-native-vector-icons/Ionicons';
import {ScheduleContext} from '../../../../../contexts/Schedule/ScheduleContext';
import AlertModal from '../../../../components/AlertModal';
import ErrorMessage from '../../../../components/ErrorMessage';
import {getSalonById} from '../../../../../services/SalonService';
import {UserContext} from '../../../../../contexts/User/UserContext';
import {PartnerContext} from '../../../../../contexts/Partner/PartnerContext';
import {ClientContext} from '../../../../../contexts/Client/ClientContext';

const SchedulingRegister = ({route}) => {
  const {dropdownProcedures, loadAllProcedures} = useContext(ProcedureContext);
  const {
    saveSchedule,
    registeredSchedules,
    updateScheduleInView,
    cleanRegisteredSchedules,
    editSchedule,
    addSchedule,
    updateSchedule,
    deleteSchedule,
    deleteScheduleInView,
  } = useContext(ScheduleContext);
  const {currentUser} = useContext(UserContext);
  const {loadAllPartners, partners} = useContext(PartnerContext);
  const {loadAllClients, clients} = useContext(ClientContext);

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState({
    isShowing: false,
    text: '',
  });
  const [selectedDate, setSelectedDate] = useState(
    dateConverter(route.params.date),
  );

  const [schedule, setSchedule] = useState({procedures: []});
  const [dropdownClients, setDropdownClients] = useState([]);
  const [dropdownPartners, setDropdownPartners] = useState([]);
  const navigate = useNavigation();

  useEffect(() => {
    const loadProcedureDropdown = async () => {
      await Promise.all([
        loadAllProcedures(currentUser.idSalon),
        loadAllClients(currentUser.idSalon),
        loadAllPartners(currentUser.idSalon),
      ]).then(
        () => {
          setIsLoading(false);
          setDropdownClients(buildDropdown(clients));
          setDropdownPartners(buildDropdown(partners));

          console.log(dropdownPartners);
        },
        error => setIsLoading(false),
      );
      setIsLoading(false);
    };
    loadProcedureDropdown();
  }, []);

  const handleMultiSelect = item => {
    let selectedItem = xorBy(schedule.procedures, [item], 'item');

    setSchedule({
      ...schedule,
      ['procedures']: selectedItem,
    });
  };

  const handleModal = (isShowing, text) => {
    setShowAlertModal({isShowing: isShowing, text: text});
  };

  const chooseAddClientMethod = async () => {
    const {isInView, indexInView} = {...schedule};

    if (verifyInformation() && isInView) {
      schedule.isInView = false;
      editSchedule({schedule: schedule, index: indexInView});
      setErrorMessage('');
      setSchedule({procedures: []});
    }

    if (verifyInformation() && !isInView) {
      addSchedule(schedule);
      setErrorMessage('');
      setSchedule({procedures: []});
    }
  };

  const saveSchedules = () => {
    setIsLoading(true);

    if (verifyInformationToGo()) {
      saveSchedule().then(
        () => {
          setIsLoading(false);
          cleanRegisteredSchedules();
          navigate.navigate('SchedulingCalendar');
          setErrorMessage('');
          setSchedule({procedures: []});
        },
        error => {
          setIsLoading(false);
          console.log(error);
        },
      );
    }
  };

  const updateSchedules = () => {
    setIsLoading(true);
    updateSchedule(schedule).then(
      async () => {
        setIsLoading(false);
        navigate.navigate('SchedulingCalendar');
        setErrorMessage('');
        setSchedule({procedures: []});
      },
      error => {
        setIsLoading(false);
        console.log(error);
      },
    );
  };

  const deleteSchedules = () => {
    setIsLoading(true);
    deleteSchedule(schedule).then(
      () => {
        setIsLoading(false);
        navigate.navigate('SchedulingCalendar');
        setErrorMessage('');
        setSchedule({procedures: []});
      },
      error => {
        setIsLoading(false);
        console.log(error);
      },
    );
  };

  const handleClient = (schedule, index) => {
    updateScheduleInView(index);
    schedule.isInView = !schedule.isInView;
    schedule.indexInView = index;

    setSchedule(schedule);

    if (!verifyIfIsEditing()) setSchedule({procedures: []});
  };

  const verifyIfIsEditing = () => {
    return registeredSchedules.some(schedule => schedule.isInView === true);
  };

  const verifyInformationToGo = () => {
    let ableToGo = true;

    if (Object.keys(schedule).length === 3) {
      addSchedule(schedule);
      return ableToGo;
    } else if (registeredSchedules.length === 0) {
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
      schedule === {} ||
      schedule.employee === undefined ||
      schedule.employee === '' ||
      schedule.partner === undefined ||
      schedule.partner === '' ||
      schedule.procedures === undefined ||
      schedule.procedures.length !== 0
    ) {
      ableToGo = false;
      errorMessage = errorMessages.clientMessage;
    }

    setErrorMessage(errorMessage);
    return ableToGo;
  };

  const loadBoxInformation = () =>
    registeredSchedules.map((schedule, index) => (
      <S.BoxContent onPress={() => handleClient(schedule, index)} key={index}>
        <S.BoxText isInView={schedule.isInView}>{schedule.name}</S.BoxText>
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
            onPress={() => navigate.navigate('Schedulings')}
          />
          <S.HeaderTitle>
            <DatePicker
              style={{}}
              date={selectedDate}
              mode="date"
              placeholder="Selecione uma data"
              format="DD/MM/YYYY"
              confirmBtnText="OK"
              cancelBtnText="Cancelar"
              onDateChange={date => {
                setSelectedDate(date);
              }}
              showIcon={false}
              customStyles={{
                dateInput: {
                  borderWidth: 0,
                },
                dateText: {
                  color: `${global.colors.lightBlueColor}`,
                  fontSize: 20,
                },

                // ... You can check the source to find the other keys.
              }}
            />
          </S.HeaderTitle>
        </S.HeaderContent>
        <S.BodyContent>
          <S.SelectContent>
            {/*<AutocompleteInput placeholder={'Cliente'} data={[]} />*/}
            {/*<AutocompleteInput*/}
            {/*  placeholder={'Parceiro'}*/}
            {/*  data={dropdownPartners}*/}
            {/*/>*/}
            <SelectBox
              label={'Procedimentos'}
              inputPlaceholder={'Procure pelo seu procedimento'}
              listEmptyText={'Nenhum procedimento foi encontrado'}
              options={dropdownProcedures}
              selectedValues={schedule.procedures}
              onMultiSelect={item => handleMultiSelect(item)}
              onTapClose={item => handleMultiSelect(item)}
              isMulti
              arrowIconColor={`${global.colors.lightBlueColor}`}
              searchIconColor={`${global.colors.lightBlueColor}`}
              toggleIconColor={`${global.colors.lightBlueColor}`}
              labelStyle={{
                color: `${global.colors.lightBlueColor}`,
              }}
              listEmptyLabelStyle={{
                marginBottom: 20,
              }}
            />
          </S.SelectContent>
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
                textColor={`${global.colors.blueColor}`}
              />
            )}

            {isLoading && (
              <S.LoadingContent>
                <ActivityIndicator
                  size="large"
                  color={global.colors.blueColor}
                />
              </S.LoadingContent>
            )}

            <S.ButtonsContent>
              {!isEditing && (
                <SubmitButton
                  text={schedule.isInView ? 'Editar' : 'Adicionar'}
                  onPress={() => chooseAddClientMethod()}
                  width={'40%'}
                  height={'30px'}
                  fontSize={'18px'}
                  buttonColor={`${global.colors.blueColor}`}
                />
              )}

              {schedule.isInView && (
                <S.DeleteButton
                  onPress={() => {
                    deleteScheduleInView(schedule);
                    setSchedule({});
                  }}>
                  <Icon name="trash" size={17} />
                </S.DeleteButton>
              )}
            </S.ButtonsContent>
          </S.AddButtonContent>
          <S.SubmitButtonContent>
            <SubmitButton
              disabled={verifyIfIsEditing()}
              text={'Salvar'}
              onPress={() => (!isEditing ? saveSchedules() : updateSchedules())}
              width={'40%'}
              height={'50px'}
              fontSize={'18px'}
              buttonColor={`${global.colors.blueColor}`}
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
          handleModal(false, '');
        }}
        onOk={() => {
          deleteSchedules();
        }}
        title={'Atenção.'}
      />
    </S.Container>
  );
};

export default SchedulingRegister;
