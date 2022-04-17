import RNDateTimePicker from "@react-native-community/datetimepicker";
import {useNavigation} from "@react-navigation/native";
import moment from "moment";
import React, {useState} from "react";
import {Dimensions, Text} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import RegisterComponent from "../../../../components/huge/RegisterComponent";
import AutoComplete from "../../../../components/small/AutoComplete";
import {InputTitle} from "../../../../components/small/Input/styled";
import MultipleSelect from "../../../../components/small/MultipleSelect";


import * as S from "./styled";
import Colors from "../../../../../common/style/Colors";
import {useClient, useEmployee, useProcedure, useSchedule, useUser} from "../../../../../hooks";
import {convertStringDateToDate} from "../../../../../common/converters/DateConverter";
import {useForm, FormProvider, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {scheduleValidationSchema} from "../../../../../common/validators/Schemas";
import {useLayout} from "../../../../../hooks/Layout";
import DatePicker from "../../../../components/small/DatePicker";
import {xorBy} from "lodash";

const defaultValues = {
    client: "",
    employee: {},
    procedures: [],
    scheduleDate: new Date(),
};

const ScheduleRegister = ({route}) => {
    const methods = useForm({
        defaultValues,
        resolver: yupResolver(scheduleValidationSchema),
    });

    const {control, reset, getValues, handleSubmit, setValue} = methods;
    const {handleModal, modal, handleLoading} = useLayout();

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
        schedules,
    } = useSchedule();
    const screenHeight = Dimensions.get("screen").height;

    const {employees} = useEmployee();
    const {clients} = useClient();
    const {procedures} = useProcedure();
    const {currentUser, isOwner} = useUser();

    const [errors, setErrors] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    const currentEmployee =
        employees.find(employees => employees.id === currentUser.idFunc) !== undefined
            ? employees.find(employees => employees.id === currentUser.idFunc)
            : {};

    // const [schedule, setSchedule] = useState({
    //   client: "",
    //   employee: currentEmployee,
    //   procedures: [],
    //   scheduleDate: new Date(route.params?.date),
    // });

    const navigate = useNavigation();

    // navigate.addListener('beforeRemove', () => {
    //   sortSchedules();
    // });
    //
    // navigate.addListener("focus", () => {
    //   const scheduleInView = route.params?.schedule ? route.params?.schedule : {};

    //   if (Object.keys(scheduleInView).length !== 0) {
    //     setSchedule({
    //       ...scheduleInView,
    //       procedureListWithoutChanges: scheduleInView.procedures,
    //     });
    //     setIsEditing(true);
    //   }
    // });

    const handleMultiSelect = (items, handleCallback) => {
        let selectedItems = xorBy(getValues("procedures"), [items], "name");
        handleCallback(selectedItems)
    };


    const saveSchedules = (data) => {
        console.log("data", data)
        // schedule.salonId = currentUser.idSalon;
        // setIsLoading(true);
        // saveSchedule(schedule).then(
        //   () => {
        //     sortScheduleList();
        //     cleanRegisteredSchedules();
        //     handleErrorMessage([""]);
        //     clearSchedule();
        //     handleModal(true, "Gostaria de marcar mais algum agendamento? ");
        //     setIsLoading(false);
        //   },
        //   error => {
        //     setIsLoading(false);
        //     console.error(error);
        //   },
        // );
    };

    const updateSchedules = () => {
        // setIsLoading(true);
        // updateSchedule(schedule).then(
        //   () => {
        //     sortScheduleList();
        //     setIsLoading(false);
        //     navigate.replace("TabStack", {
        //       screen: "Schedules",
        //       params: {
        //         isToShowAgenda: false,
        //       },
        //     });
        //     setIsLoading(false);
        //     handleErrorMessage([""]);
        //
        //     clearSchedule();
        //   },
        //
        //   error => {
        //     setIsLoading(false);
        //     console.error(error);
        //   },
        // );
    };

    const verifyHourBeforeSet = (selectedDate) => {
        let ableToSet = true;
        const formattedSelectDateHour = moment(selectedDate.toString()).format("DD/MM/YYYY - HH:mm");

        if (schedules.some(registeredSchedule => registeredSchedule.formattedDateHour === formattedSelectDateHour)) {
            ableToSet = false;
        }

        schedules.forEach(({procedures}) => {
            procedures.forEach(({startDate, endDate}) => {
                const formattedStartDate = convertStringDateToDate(startDate);
                const formattedEndDate = convertStringDateToDate(endDate);
                const formattedTestDate = convertStringDateToDate(formattedSelectDateHour);

                if (moment(formattedTestDate).isBetween(formattedStartDate, formattedEndDate)) {
                    ableToSet = false;
                }

            });
        });

        return ableToSet;
    };

    // const validForm = () => {
    //   let ableToSubmit = true;
    //   let messages = [];
    //   if (
    //     schedule === {} ||
    //     schedule.client === undefined ||
    //     Object.keys(schedule.client).length === 0 ||
    //     typeof schedule.client === "string" ||
    //     schedule.employee === undefined ||
    //     Object.keys(schedule.employee).length === 0 ||
    //     typeof schedule.employee === "string" ||
    //     schedule.procedures === undefined ||
    //     schedule.procedures.length === 0
    //   ) {
    //     ableToSubmit = false;
    //     // messages.push(errorMessages.scheduleRegisterMessage);
    //   }
    //
    //   if (!verifyHourBeforeSet(schedule.scheduleDate)) {
    //     ableToSubmit = false;
    //     // messages.push(errorMessages.scheduleDateMessage);
    //   }
    //
    //   handleErrorMessage(messages);
    //
    //   return ableToSubmit;
    // };


    const clearProcedures = () => {
        setValue("procedures", []);
    };

    return (
        <FormProvider {...methods}>
            <RegisterComponent
                onCancel={() =>
                    navigate.goBack()
                }
                color={Colors.PURPLE}
                preRegisteredItems={registeredSchedules}
                onConfirm={isEditing ? updateSchedules : handleSubmit(saveSchedules)}
                isEditing={isEditing}
                registeredItemRightInformation={"procedures"}
                registeredItemLeftInformation={"client"}
                headerTitle={"Agendamento"}
                clearItem={clearProcedures}
                itemType={"schedule"}
            >

                <S.BodyContent>
                    <Controller
                        name="scheduleDate"
                        control={control}
                        render={({
                                     field: {onChange, value, name},
                                     fieldState: {error},
                                 }) => (
                            <DatePicker screenHeight={screenHeight}
                                        color={Colors.PURPLE}
                                        value={value}
                                        onChange={onChange}
                            />
                        )}/>

                    <Controller
                        name="client"
                        control={control}
                        render={({
                                     field: {onChange, value, name},
                                     fieldState: {error},
                                 }) => (
                            <AutoComplete
                                inputText={"Cliente*"}
                                placeholder={"Procure por um cliente"}
                                iconName={"user"}
                                textColor={Colors.DARK_GREY}
                                iconColor={Colors.PURPLE}
                                searchLengthToSuggest={2}
                                options={clients}
                                name={name}
                                value={value}
                                handleChange={onChange}
                                error={error}
                            />
                        )}/>

                    <Controller
                        name="employee"
                        control={control}
                        render={({
                                     field: {onChange, value, name},
                                     fieldState: {error},
                                 }) => (
                            <AutoComplete
                                inputText={"Parceiro*"}
                                editable={isOwner}
                                placeholder={"Procure por um parceiro"}
                                textColor={Colors.DARK_GREY}
                                iconName={"cut"}
                                iconColor={Colors.PURPLE}
                                searchLengthToSuggest={2}
                                options={
                                    isOwner
                                        ? employees
                                        : employees.filter(partner => partner.id === currentUser.idFunc)
                                }
                                name={name}
                                value={value}
                                handleChange={onChange}
                                error={error}
                            />)}/>

                    <Text>{JSON.stringify(getValues("employee"))}</Text>

                    <Controller
                        name="procedures"
                        control={control}
                        render={({
                                     field: {onChange, value, name},
                                     fieldState: {error},
                                 }) => (
                            <MultipleSelect
                                inputText={"Procedimentos*"}
                                disabled={Object.keys(getValues("employee")).length > 5}
                                iconColor={Colors.PURPLE}
                                plusIconColor={Colors.PURPLE}
                                modalHeaderText={"Escolha os procedimentos"}
                                options={
                                    currentUser.idFunc === getValues("employee").id
                                        ? procedures
                                        : getValues("employee").procedures
                                }
                                selectTextColor={Colors.DARK_GREY}
                                selectedItemBorderColor={Colors.PURPLE}
                                value={value}
                                handleMultiSelect={(items) => handleMultiSelect(items, onChange)}
                                placeholderText={"Procedimentos"}
                                clearValue={clearProcedures}
                            /> )} />
                </S.BodyContent>

            </RegisterComponent>
        </FormProvider>
    );
};

export default ScheduleRegister;
