import React, {useContext, useState} from 'react';
import {ActivityIndicator, Platform} from 'react-native';

import * as S from './styled';
import BackButton from '../../../../components/small/BackButton';
import global from '../../../../../common/global';
import {useNavigation} from '@react-navigation/native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {ProcedureContext} from '../../../../../contexts/Procedure/ProcedureContext';
import {xorBy} from 'lodash';
import SubmitButton from '../../../../components/small/SubmitButton';
import errorMessages from '../../../../../common/errorMessages';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ScheduleContext} from '../../../../../contexts/Schedule/ScheduleContext';
import AlertModal from '../../../../components/small/AlertModal';
import ErrorMessage from '../../../../components/small/ErrorMessage';
import {UserContext} from '../../../../../contexts/User/UserContext';
import {PartnerContext} from '../../../../../contexts/Partner/PartnerContext';
import {ClientContext} from '../../../../../contexts/Client/ClientContext';
import AutoComplete from '../../../../components/small/AutoComplete';
import MultipleSelect from '../../../../components/small/MultipleSelect';
import moment from 'moment';
import RegisterComponent from '../../../../components/huge/RegisterComponent';
import {buildDateTime} from '../../../../../pipe/dateBuilder';
import Loading from '../../../../components/small/Loading';

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
    sortScheduleList,
  } = useContext(ScheduleContext);

  const {partners} = useContext(PartnerContext);
  const {clients} = useContext(ClientContext);
  const {procedures} = useContext(ProcedureContext);
  const {currentUser, isOwner} = useContext(UserContext);

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState({
    isShowing: false,
    text: '',
  });

  const [schedule, setSchedule] = useState({
    client: '',
    employee: partners.find(partner => partner.id === currentUser.idFunc),
    procedures: [],
    scheduleDate: new Date(route.params.date),
  });

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const navigate = useNavigation();

  // navigate.addListener('beforeRemove', () => {
  //   sortSchedules();
  // });

  navigate.addListener('focus', () => {
    const scheduleInView = route.params?.schedule ? route.params?.schedule : {};

    if (Object.keys(scheduleInView).length !== 0) {
      setSchedule({
        ...scheduleInView,
        procedureListWithoutChanges: scheduleInView.procedures,
      });
      setIsEditing(true);
    }
  });

  const clearSchedule = () => {
    const {scheduleDate, employee} = schedule;

    setSchedule({
      client: '',
      employee: employee,
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
    if (name === 'scheduleHour') {
      value = buildDateTime(schedule.scheduleDate, value);
      name = 'scheduleDate';
    }

    setSchedule({
      ...schedule,
      [name]: value,
    });
  };

  const handleModal = (isShowing, text) => {
    setShowAlertModal({isShowing: isShowing, text: text});
  };

  const chooseAddScheduleMethod = async () => {
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
          sortScheduleList();
          cleanRegisteredSchedules();
          setErrorMessage('');
          clearSchedule();
          navigate.push('TabStack', {
            screen: 'SchedulingCalendar',
            params: {
              calendarViewState: false,
            },
          });
          setIsLoading(false);
        },
        error => {
          setIsLoading(false);
          console.error(error);
        },
      );
    }
  };

  const updateSchedules = () => {
    setIsLoading(true);
    updateSchedule(schedule).then(
      () => {
        sortScheduleList();
        setIsLoading(false);
        navigate.replace('TabStack', {
          screen: 'SchedulingCalendar',
          params: {
            calendarViewState: false,
          },
        });
        setIsLoading(false);
        setErrorMessage('');
        clearSchedule();
      },

      error => {
        setIsLoading(false);
        console.error(error);
      },
    );
  };

  const deleteSchedules = () => {
    setIsLoading(true);
    deleteSchedule(schedule).then(
      () => {
        setIsLoading(false);
        navigate.push('TabStack', {
          screen: 'SchedulingCalendar',
          params: {
            calendarViewState: false,
          },
        });
        setErrorMessage('');
        clearSchedule();
      },
      error => {
        setIsLoading(false);
        console.error(error);
      },
    );
  };

  const cancelEditing = () => {
    updateScheduleInView(-1);
    clearSchedule();
  };

  const deletePreRegisteredItem = schedule => {
    deleteScheduleInView(schedule);
    clearSchedule();
  };

  const handleSchedule = (schedule, index) => {
    updateScheduleInView(index);
    schedule.isInView = !schedule.isInView;
    schedule.indexInView = index;

    setSchedule(schedule);

    if (!verifyIfIsPreRegisteredEditing()) clearSchedule();
  };

  const verifyIfIsPreRegisteredEditing = () => {
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
    const currentDate = selectedDate || schedule.scheduleDate;
    if (mode === 'date') {
      handleChange('scheduleDate', currentDate);

      showMode(false, 'time');
    } else if (mode === 'time') {
      showMode(false, '');

      handleChange('scheduleHour', currentDate);
    }
    // setShow(Platform.OS === 'ios');
  };

  const showMode = (state, currentMode) => {
    if (currentMode === 'date' && state) {
      setShow(true);
      setMode(currentMode);
    } else if (currentMode === 'time' && !state) {
      setMode(currentMode);
    } else if (currentMode === '') {
      setShow(false);
    }
  };

  return (
    <RegisterComponent
      onCancel={() =>
        navigate.push('TabStack', {
          screen: 'SchedulingCalendar',
          params: {
            calendarState: true,
          },
        })
      }
      showAddButton={true}
      color={global.colors.purpleColor}
      preRegisteredItems={registeredSchedules}
      handleSelect={handleSchedule}
      deletePreRegisteredItem={deletePreRegisteredItem}
      onConfirm={isEditing ? updateSchedules : saveSchedules}
      isEditing={isEditing}
      isPreRegisteredEditing={verifyIfIsPreRegisteredEditing()}
      cancelEditing={cancelEditing}
      onAdd={chooseAddScheduleMethod}
      registeredItemRightInformation={'procedures'}
      registeredItemLeftInformation={'client'}
      headerTitle={'Agendamento'}>
      {errorMessage !== '' && (
        <ErrorMessage
          text={errorMessage}
          width={'70%'}
          textColor={`${global.colors.purpleColor}`}
        />
      )}

      <Loading isLoading={isLoading} color={`${global.colors.purpleColor}`} />

      <S.BodyContent>
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

        <S.HeaderText onPress={() => showMode(true, 'date')}>
          {moment(schedule.scheduleDate).format('DD/MM/YYYY HH:mm')}
        </S.HeaderText>
        <AutoComplete
          inputText={'Cliente'}
          placeholder={'Procure por um cliente'}
          iconName={'user'}
          textColor={global.colors.darkGreyColor}
          iconColor={global.colors.purpleColor}
          searchLengthToSuggest={2}
          options={clients}
          name={'client'}
          value={schedule.client}
          handleChange={handleChange}
        />

        <AutoComplete
          inputText={'Parceiro'}
          editable={isOwner}
          placeholder={'Procure por um parceiro'}
          textColor={global.colors.darkGreyColor}
          iconName={'cut'}
          iconColor={global.colors.purpleColor}
          searchLengthToSuggest={2}
          options={
            isOwner
              ? partners
              : partners.filter(partner => partner.id === currentUser.idFunc)
          }
          name={'employee'}
          value={schedule.employee}
          handleChange={handleChange}
        />

        {Object.keys(schedule.employee).length > 5 && (
          <MultipleSelect
            inputText={'Procedimentos'}
            disabled={Object.keys(schedule.employee).length <= 5}
            iconColor={global.colors.purpleColor}
            plusIconColor={global.colors.purpleColor}
            modalHeaderText={'Escolha os procedimentos'}
            options={
              currentUser.idFunc === schedule.employee.id
                ? procedures
                : schedule.employee.procedures
            }
            selectTextColor={global.colors.darkGreyColor}
            selectedItemBorderColor={global.colors.purpleColor}
            value={schedule.procedures}
            handleMultiSelect={handleMultiSelect}
            placeholderText={'Procure por um procedimento'}
          />
        )}
      </S.BodyContent>

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
    </RegisterComponent>
  );
};

export default SchedulingRegister;
