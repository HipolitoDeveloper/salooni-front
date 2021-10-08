import React, {useContext, useState} from 'react';
import {ActivityIndicator, Platform} from 'react-native';

import * as S from './styled';
import BackButton from '../../../../components/BackButton';
import global from '../../../../../common/global';
import {useNavigation} from '@react-navigation/native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {ProcedureContext} from '../../../../../contexts/Procedure/ProcedureContext';
import {xorBy} from 'lodash';
import SubmitButton from '../../../../components/SubmitButton';
import errorMessages from '../../../../../common/errorMessages';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ScheduleContext} from '../../../../../contexts/Schedule/ScheduleContext';
import AlertModal from '../../../../components/AlertModal';
import ErrorMessage from '../../../../components/ErrorMessage';
import {UserContext} from '../../../../../contexts/User/UserContext';
import {PartnerContext} from '../../../../../contexts/Partner/PartnerContext';
import {ClientContext} from '../../../../../contexts/Client/ClientContext';
import AutoComplete from '../../../../components/AutoComplete';
import MultipleSelect from '../../../../components/MultipleSelect';
import moment from 'moment';

const SchedulingRegister = ({route}) => {
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
    loadAllSchedules,
  } = useContext(ScheduleContext);

  const {partners} = useContext(PartnerContext);
  const {clients} = useContext(ClientContext);
  const {procedures} = useContext(ProcedureContext);
  const {currentUser} = useContext(UserContext);

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState({
    isShowing: false,
    text: '',
  });

  const [schedule, setSchedule] = useState({
    client: '',
    employee: '',
    procedures: [],
    scheduleDate: new Date(route.params.date),
  });

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const navigate = useNavigation();

  navigate.addListener('focus', () => {
    const scheduleInView = route.params?.schedule ? route.params?.schedule : {};
    console.log('scheduleinView', scheduleInView);

    if (Object.keys(scheduleInView).length !== 0) {
      setSchedule({
        ...scheduleInView,
        procedureListWithoutChanges: scheduleInView.procedures,
      });
      setIsEditing(true);
    }
  });

  const clearSchedule = () => {
    const scheduleDate = schedule.scheduleDate;

    setSchedule({
      client: '',
      employee: '',
      procedures: [],
      scheduleDate: scheduleDate,
    });
  };

  const handleMultiSelect = items => {
    let selectedItem = xorBy(schedule.procedures, [items], 'name');

    setSchedule({
      ...schedule,
      ['procedures']: selectedItem,
    });
  };

  const handleChange = (name, value) => {
    setSchedule({
      ...schedule,
      [name]: value,
    });
  };

  const handleModal = (isShowing, text) => {
    setShowAlertModal({isShowing: isShowing, text: text});
  };

  const chooseAddClientMethod = async () => {
    const {isInView, indexInView} = schedule;
    if (verifyInformation() && isInView) {
      schedule.isInView = false;
      editSchedule({schedule: schedule, index: indexInView});
      setErrorMessage('');
      clearSchedule();
    }
    if (verifyInformation() && !isInView) {
      schedule.salonId = currentUser.idSalon;
      addSchedule(schedule);
      setErrorMessage('');
      clearSchedule();
    }
  };

  const saveSchedules = () => {
    setIsLoading(true);

    if (verifyInformationToGo()) {
      saveSchedule().then(
        () => {
          setIsLoading(false);
          cleanRegisteredSchedules();
          setErrorMessage('');
          clearSchedule();
          navigate.push('ApplicationStack', {
            screen: 'SchedulingCalendar',
            params: {
              typeView: 'AGN',
            },
          });
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
      () => {
        setIsLoading(false);
        navigate.push('ApplicationStack', {
          screen: 'SchedulingCalendar',
          params: {
            typeView: 'LST',
          },
        });
        setErrorMessage('');
        clearSchedule();
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
        navigate.push('ApplicationStack', {
          screen: 'SchedulingCalendar',
          params: {
            typeView: 'LST',
          },
        });
        setErrorMessage('');
        clearSchedule();
      },
      error => {
        setIsLoading(false);
        console.log(error);
      },
    );
  };

  const handleSchedule = (schedule, index) => {
    updateScheduleInView(index);
    schedule.isInView = !schedule.isInView;
    schedule.indexInView = index;

    setSchedule(schedule);

    if (!verifyIfIsEditing()) clearSchedule();
  };

  const verifyIfIsEditing = () => {
    return registeredSchedules.some(schedule => schedule.isInView === true);
  };

  const verifyInformationToGo = () => {
    let ableToGo = true;

    if (Object.keys(schedule).length === 3) {
      // addSchedule(schedule);
      return ableToGo;
    } else if (registeredSchedules.length === 0) {
      ableToGo = false;
      setErrorMessage(errorMessages.noClientMessage);
      setIsLoading(false);
    }
    return ableToGo;
  };

  const verifyInformation = () => {
    let ableToGo = true;
    let errorMessage = '';

    if (
      schedule === {} ||
      schedule.client === undefined ||
      Object.keys(schedule.client).length === 0 ||
      schedule.employee === undefined ||
      Object.keys(schedule.employee).length === 0 ||
      schedule.procedures === undefined ||
      schedule.procedures.length === 0
    ) {
      ableToGo = false;
      errorMessage = errorMessages.scheduleMessage;
      setIsLoading(false);
    }

    setErrorMessage(errorMessage);
    return ableToGo;
  };

  const onChange = (event, selectedDate) => {
    if (mode === 'date') showTimepicker();
    const currentDate = selectedDate || schedule.scheduleDate;
    setShow(Platform.OS === 'ios');
    handleChange('scheduleDate', currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const loadBoxInformation = () =>
    registeredSchedules.map((schedule, index) => (
      <S.BoxContent onPress={() => handleSchedule(schedule, index)} key={index}>
        <S.BoxText isInView={schedule.isInView}>
          {schedule.client.name}
        </S.BoxText>
      </S.BoxContent>
    ));

  return (
    <S.Container>
      <S.Content>
        <S.HeaderContent>
          <BackButton
            positionTop={'23px'}
            positionLeft={'-5px'}
            buttonColor={`${global.colors.purpleColor}`}
            onPress={() =>
              navigate.push('ApplicationStack', {
                screen: 'SchedulingCalendar',
                params: {
                  typeView: 'LST',
                },
              })
            }
          />
          <S.HeaderTitle>
            {show && (
              <RNDateTimePicker
                value={schedule.scheduleDate}
                mode={mode}
                is24Hour={true}
                display="default"
                minimumDate={new Date(1950, 0, 1)}
                maximumDate={new Date(2300, 10, 20)}
                minuteInterval={10}
                onChange={onChange}
                locale="pt-BR"
              />
            )}
            <S.HeaderText onPress={showDatepicker}>
              {moment(schedule.scheduleDate).format('DD/MM/YYYY HH:mm')}
            </S.HeaderText>
          </S.HeaderTitle>
          {isLoading && (
            <S.LoadingContent>
              <ActivityIndicator
                size="large"
                color={global.colors.purpleColor}
              />
            </S.LoadingContent>
          )}
        </S.HeaderContent>
        <S.BodyContent>
          <AutoComplete
            placeholder={'Cliente'}
            iconName={'user'}
            textColor={'black'}
            iconColor={global.colors.purpleColor}
            searchLengthToSuggest={2}
            options={clients}
            name={'client'}
            value={schedule.client}
            handleChange={handleChange}
          />

          <AutoComplete
            placeholder={'Parceiros'}
            textColor={'black'}
            iconName={'cut'}
            iconColor={global.colors.purpleColor}
            searchLengthToSuggest={2}
            options={partners}
            name={'employee'}
            value={schedule.employee}
            handleChange={handleChange}
          />
          <MultipleSelect
            iconColor={global.colors.purpleColor}
            plusIconColor={global.colors.purpleColor}
            modalHeaderText={'Escolha os procedimentos'}
            options={procedures}
            selectTextColor={'black'}
            selectedItemBorderColor={global.colors.purpleColor}
            value={schedule.procedures}
            handleMultiSelect={handleMultiSelect}
          />

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
                textColor={`${global.colors.purpleColor}`}
              />
            )}

            <S.ButtonsContent>
              {!isEditing && (
                <SubmitButton
                  text={schedule.isInView ? 'Editar' : 'Adicionar'}
                  onPress={() => chooseAddClientMethod()}
                  width={'40%'}
                  height={'30px'}
                  fontSize={'18px'}
                  buttonColor={`${global.colors.purpleColor}`}
                />
              )}

              {schedule.isInView && (
                <S.DeleteButton
                  onPress={() => {
                    deleteScheduleInView(schedule);
                    clearSchedule();
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
              buttonColor={`${global.colors.purpleColor}`}
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
