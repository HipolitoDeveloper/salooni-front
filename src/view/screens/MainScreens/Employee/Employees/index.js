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

const Employees = () => {
        const {
            loadAllEmployees,
            employees,
            deleteUniqueEmployee,
            deleteEmployees,
            deleteEmployeeProcedure,
        } = useEmployee()
        const {currentUser, isOwner} = useUser()
        const {handleModal, modal} = useLayout();

        const items = employees.filter(({employeeType}) => employeeType === 'PRC');
        const [isLoading, setIsLoading] = useState(false);
        const [stateAgenda, setStateAgenda] = useState({isShowing: false, item: {}});
        const navigate = useNavigation();

        const navigateToEmployeeCalendar = employee => {
            setIsLoading(true);
            getAllSchedulesBySalon(
                currentUser.idSalon,
                employee.id,
                employee.employeeType,
                false
            ).then(
                calendarSchedule => {
                    setIsLoading(false);
                    handleAgenda(calendarSchedule);
                    // navigate.push('ApplicationStack', {
                    //   screen: 'Schedules',
                    //   params: {
                    //     calendarViewState: true,
                    //     employeeView: true,
                    //     employee: employee,
                    //   },
                    // });
                },
                error => {
                    console.log(error);
                    setIsLoading(false);
                },
            );
        };

        const deletePartner = partnerToDelete => {
            setIsLoading(true);
            deleteUniqueEmployee(partnerToDelete).then(
                () => {
                    setIsLoading(false);
                },
                error => {
                    setIsLoading(false);
                    console.log(error);
                },
            );
        };

        const deletePartners = partnersToDelete => {
            setIsLoading(true);
            deleteEmployees(partnersToDelete).then(
                () => {
                    setIsLoading(false);
                },
                error => {
                    setIsLoading(false);
                    console.log(error);
                },
            );
        };

        const fetchData = async (skip, limit) => {
            setIsLoading(true);
            try {
                await loadAllEmployees(currentUser.idSalon)
                setIsLoading(false);

                return employees.filter(employee => employee.employeeType === 'PRC')
            } catch (e) {
                console.error(e)
                setIsLoading(false);
                handleModal({
                    ...modal,
                    visible: true,
                    variant: "alert",
                    errors: Errors.LOAD_MORE_ERROR,
                });
            }


        };
        const handleAgenda = item => {
            setStateAgenda({isShowing: !stateAgenda.isShowing, item: item});
        };

        return (

            <S.Container>
                <Notification/>

                {stateAgenda.isShowing && (
                    <Calendar
                        isVisible={stateAgenda.isShowing}
                        calendarSchedule={stateAgenda.item}
                        color={Colors.PURPLE}
                        handleModal={handleAgenda}
                    />
                )}

                {items.length === 0
                    ? (
                        <Loading isLoading={isLoading} color={Colors.PURPLE}/>
                    ) : (
                        <List
                            showMenu={true}
                            showAddButton={true}
                            fetchData={fetchData}
                            refreshing={isLoading}
                            searchPlaceHolder={'Procure pelos seus parceiros'}
                            navigateToCalendar={navigateToEmployeeCalendar}
                            isOwner={isOwner}
                            showCalendarButton={true}
                            showHeader={true}
                            itemType={"employee"}
                            headerText={'Parceiros'}
                            color={Colors.GREEN}
                            itemList={items}
                            menuItems={['name', 'tel', 'email', 'procedures']}
                            deleteItemList={deletePartners}
                            deleteUniqueItem={deletePartner}
                            deleteProcedure={deleteEmployeeProcedure}
                            isLoading={isLoading}
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
                    )}
            </S.Container>
        );
    }
;

export default Employees;
