import RNDateTimePicker from "@react-native-community/datetimepicker";
import {useNavigation} from "@react-navigation/native";
import moment from "moment";
import React, {useEffect, useState} from "react";
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
import Constants from "../../../../../common/Constants";
import Errors from "../../../../../common/Errors";
import {currentDate} from "../../../../../factory/ScheduleFactory";

const defaultValues = {
    procedures: [],
    scheduleDate: currentDate,
};

const ScheduleRegister = ({route}) => {
    const methods = useForm({
        defaultValues,
        resolver: yupResolver(scheduleValidationSchema),
    });

    const {control, reset, getValues, handleSubmit, setValue, setError, clearErrors} = methods;

    const {handleModal, modal, handleLoading} = useLayout();

    const {
        saveSchedule,
        updateSchedule,
        deleteSchedule,
        schedules,
    } = useSchedule();
    const screenHeight = Dimensions.get("screen").height;

    const {employees, currentEmployee} = useEmployee();
    const {clients} = useClient();
    const {procedures} = useProcedure();
    const {currentUser, isOwner} = useUser();

    const [isEditing, setIsEditing] = useState(false);
    const [procedureOptions, setProcedureOptions] = useState([]);

    const navigate = useNavigation();

    useEffect(() => {
        setValue("employee",
            currentEmployee ??
            {})

        setProcedureOptions(currentEmployee?.procedures?.map(employeeProcedure => {
            const availableProcedure = procedures.find(procedure => employeeProcedure.id === procedure.id)
            return {id: availableProcedure?.id, name: availableProcedure?.name, time: availableProcedure?.time}
        }))
    }, [employees])

    useEffect(() => {
        const scheduleInView = route.params?.schedule;

        if (Object.keys(scheduleInView).length !== 0) {
            setIsEditing(true)
            const {id, client, employee, procedures: scheduleProcedures, scheduleDate} = scheduleInView
            console.log("scheduleInView", scheduleInView)
            setValue("id", id)
            setValue("client", client)
            setValue("employee", employee)
            setValue("scheduleDate", scheduleDate)
            setValue("procedures", scheduleProcedures?.map(employeeProcedure => {
                const availableProcedure = procedures.find(procedure => employeeProcedure.id === procedure.id)
                return {id: availableProcedure?.id, name: availableProcedure?.name, time: availableProcedure?.time}
            }))

            setProcedureOptions(employee?.procedures?.map(procedure => {
                return {
                    ...procedure,
                    selected: scheduleProcedures.some(scheduleProcedure => scheduleProcedure.id === procedure.id)
                }
            }))

        }
    }, [procedures, route])

    const setProcedures = () => {
        setValue("procedures", [])

        setProcedureOptions(currentUser.idFunc === getValues("employee").id
            ? procedures
            : getValues("employee")?.procedures?.map(procedureOption => {
                const availableProcedure = procedures.find(procedure => procedureOption.id === procedure.id)
                return {id: availableProcedure.id, name: availableProcedure.name}
            }))
    }

    const handleMultiSelect = (items, handleCallback) => {
        let selectedItems = xorBy(getValues("procedures"), [items], "id");
        handleCallback(selectedItems)
    };


    const  saveSchedules = async (data) => {
        data.salonId = currentUser.idSalon;
        handleLoading(true);
        try {
            await saveSchedule(data);
            handleLoading(false);
            handleModal({
                ...modal,
                visible: true,
                variant: "confirm",
                title: Constants.ATTENTION,
                text: Constants.MORE_SCHEDULE_REGISTER,
                onOk: () => {
                    reset();
                },
                onClose: () => {
                    navigate.push('TabStack', {screen: 'Schedules'})
                },
            });
        } catch (err) {
            console.error("SaveSchedulesError", err);
            handleLoading(false);
            handleModal({
                ...modal,
                visible: true,
                variant: "alert",
                errors: Errors.ERROR_MESSAGE,
            });
        }
    };

    const updateSchedules = async (data) => {
        handleLoading(true);

        try {
            await updateSchedule(data)
            handleLoading(false);
            navigate.push('TabStack', {screen: 'Schedules'})
        } catch (error) {
            handleLoading(false);
            console.error(error)

        }
    };

    const setScheduleDate = (value, onChange) => {
        if (verifyHourBeforeSet(value)) {
            onChange(value)
            clearErrors("scheduleDate")
        } else {
            setError("scheduleDate", {type: "custom", message: Errors.SCHEDULE_DATE_ERROR})
        }
    }

    const clearProcedures = () => {
        setValue("procedures", []);
    };


    const verifyHourBeforeSet = (selectedDate) => {
        let ableToSet = true;
        const formattedSelectDateHour = moment(selectedDate.toString()).format("DD/MM/YYYY - HH:mm");

        if (schedules.some(registeredSchedule => registeredSchedule.formattedDateHour === formattedSelectDateHour)) {
            ableToSet = false;
        }

        schedules.forEach(({procedures}) => {
            procedures.forEach(({procedure_start_date: startDate, procedure_end_date: endDate}) => {
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



    return (
        <FormProvider {...methods}>
            <RegisterComponent
                onCancel={() =>
                    navigate.goBack()
                }
                color={Colors.PURPLE}
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
                            <DatePicker
                                        mode="datetime"
                                        color={Colors.PURPLE}
                                        value={value}
                                        onChange={(value) => setScheduleDate(value, onChange)}
                                        error={error}
                                        width={"90%"}
                                        fontSize={50}
                                        label={"Data de Agendamento"}
                                        // icon={'calendar-alt'}
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
                                // iconName={"user"}
                                textColor={Colors.DARK_GREY}
                                iconColor={Colors.PURPLE}
                                searchLengthToSuggest={2}
                                options={clients}
                                name={name}
                                value={value}
                                handleChange={onChange}
                                error={error}
                                fontSize={50}
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
                                // iconName={"cut"}
                                iconColor={Colors.PURPLE}
                                searchLengthToSuggest={2}
                                options={
                                    isOwner
                                        ? employees
                                        : employees.filter(partner => partner.id === currentUser.idFunc)
                                }
                                name={name}
                                value={value}
                                handleChange={(suggestion) => {
                                    onChange(suggestion);
                                    setProcedures()
                                }}
                                error={error}
                                fontSize={50}
                            />)}/>

                    <Controller
                        name="procedures"
                        control={control}
                        render={({
                                     field: {onChange, value, name},
                                     fieldState: {error},
                                 }) => (
                            <MultipleSelect
                                inputText={"Procedimentos*"}
                                // disabled={Object.keys(getValues("employee")).length > 5}
                                iconColor={Colors.PURPLE}
                                plusIconColor={Colors.PURPLE}
                                modalHeaderText={"Escolha os procedimentos"}
                                options={procedureOptions}
                                selectTextColor={Colors.DARK_GREY}
                                selectedItemBorderColor={Colors.PURPLE}
                                value={value}
                                handleMultiSelect={(items) => handleMultiSelect(items, onChange)}
                                placeholderText={"Procedimentos"}
                                clearValue={clearProcedures}
                            />
                        )}/>
                </S.BodyContent>

            </RegisterComponent>
        </FormProvider>
    );
};

export default ScheduleRegister;
