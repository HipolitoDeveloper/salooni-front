import React, {useState} from 'react';
import * as S from './styled';
import {useNavigation} from '@react-navigation/native';
import List from '../../../../components/huge/ListComponent';
import Calendar from '../../../../components/huge/AgendaComponent';
import Notification from '../../../../components/small/Notification';
import Colors from "../../../../../common/style/Colors";
import {useEmployee, useUser} from "../../../../../hooks";
import {getAllSchedulesBySalon} from "../../../../../services/ScheduleService";
import {useLayout} from "../../../../../hooks/Layout";
import Errors from "../../../../../common/Errors";
import Loading from "../../../../components/small/Loading";
import {buildAgenda} from "../../../../../factory/ScheduleFactory";

const Employees = () => {
        const {
            loadAllEmployees,
            employees,
            deleteEmployee,
            updateEmployee

        } = useEmployee()
        const {currentUser, isOwner} = useUser()
        const {handleModal, modal, handleLoading, loading} = useLayout();

        const [stateAgenda, setStateAgenda] = useState({isShowing: false, item: {}});
        const [refreshing, setRefresing] = useState(false)

        const items = employees.filter(({employeeType}) => employeeType === 'FNC');


        const navigate = useNavigation();

        const navigateToEmployeeCalendar = async employee => {
            handleLoading(true);

            try {
                const calendarSchedules = await getAllSchedulesBySalon(
                    employee.id,
                    currentUser.idSalon,
                    employee.employeeType,
                )

                console.log("JSON", JSON.stringify((buildAgenda(calendarSchedules))))
                handleAgenda(buildAgenda(calendarSchedules))
                handleLoading(false);
            } catch (error) {
                console.error(error);
                handleLoading(false);
            }

        };

        const onDeleteEmployee = async employeeToDelete => {
            handleLoading(true);
            try {
                await deleteEmployee(employeeToDelete)
                handleLoading(false);
            } catch (error) {
                handleLoading(false);
                console.error(JSON.stringify(error));
            }
        };

        const onUpdateEmployee = async (data) => {
            handleLoading(true);
            try {
                await updateEmployee(data)
                handleLoading(false);

            } catch (error) {
                console.error(error)
                handleLoading(false);
            }
        };


        const fetchData = async (skip, limit) => {
            setRefresing(true);
            try {
                await loadAllEmployees(currentUser.idSalon)
                setRefresing(false);

                return employees.filter(employee => employee.employeeType === 'FNC')
            } catch (e) {
                console.error(e)
                setRefresing(false);
                handleModal({
                    ...modal,
                    visible: true,
                    variant: "alert",
                    errors: Errors.LOAD_MORE_ERROR,
                });
            }
        };
        const handleAgenda = item => {
            console.log("item", item)
            setStateAgenda({isShowing: !stateAgenda.isShowing, item: item});
        };

        return (

            <S.Container>

                {stateAgenda.isShowing && (
                    <Calendar
                        isVisible={stateAgenda.isShowing}
                        calendarSchedule={stateAgenda.item}
                        color={Colors.PURPLE}
                        handleModal={handleAgenda}
                    />
                )}

                <List
                    showMenu={true}
                    showAddButton={true}
                    fetchData={fetchData}
                    refreshing={refreshing}
                    searchPlaceHolder={'Procure pelos seus parceiros'}
                    navigateToCalendar={navigateToEmployeeCalendar}
                    isOwner={isOwner}
                    showCalendarButton={true}
                    showHeader={true}
                    itemType={"employee"}
                    headerText={'Parceiros'}
                    color={Colors.GREEN}
                    items={items}
                    menuItems={['name', 'tel', 'email', 'procedures']}
                    onDeleteItem={onDeleteEmployee}
                    onUpdateItem={onUpdateEmployee}
                    onAddNavigateTo={() =>
                        navigate.push('ApplicationStack', {
                            screen: 'EmployeeRegister',
                            params: {employee: []},
                        })
                    }
                    onEditNavigateTo={employee =>
                        navigate.push('ApplicationStack', {
                            screen: 'EmployeeRegister',
                            params: {employee: employee},
                        })
                    }
                />
            </S.Container>
        );
    }
;

export default Employees;
