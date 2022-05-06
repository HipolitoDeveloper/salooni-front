import {useNavigation} from "@react-navigation/native";
import moment from "moment";
import React, {useEffect, useState} from "react";
import Agenda from "../../../../components/huge/AgendaComponent";
import List from "../../../../components/huge/ListComponent";
import Loading from "../../../../components/small/Loading";
import Notification from "../../../../components/small/Notification";
import * as S from "./styled";
import {setFirstAccessUser} from "../../../../../services/UserService";
import Colors from "../../../../../common/style/Colors";
import {useSchedule, useUser} from "../../../../../hooks";
import Errors from "../../../../../common/Errors";
import {useLayout} from "../../../../../hooks/Layout";
import {Text} from "react-native";

const Schedules = ({route}) => {
    const {currentUser, setCurrentUser} = useUser();
    const {
        calendarSchedule,
        schedules,
        loadAllSchedules,
        updateSchedule,
        deleteSchedule,
        analyzeSchedules,
    } = useSchedule();

    const {handleLoading, modal, handleModal, loading} = useLayout()

    const [isShowingAgenda, setIsShowingAgenda] = useState(false);
    const [refreshing, setRefresing] = useState(false)

    const navigate = useNavigation();

    useEffect(() => {
        // setIsShowingAgenda(true);
        // navigate.addListener("focus", () => {
        //
        // });
    }, [navigate]);

    useEffect(() => {
        if (currentUser.isFirstAccess) {1
            // setShowAlertModal({
            //     text: "Qualquer dúvida relacionada ao funcionamento da aplicação, fique a vontade para explorar nossos vídeos explicativos.",
            //     isVisible: true,
            //     onOk: navigateToTutorial,
            //     title: `Bem-vindo ao Salooni.`,
            //     cancelTitle: "Continuar",
            //     okTitle: "TUTORIAL",
            //     onClose: async () => {
            //         await setCurrentUser(true, await setFirstAccessUser(currentUser.id));
            //         setShowAlertModal({text: "", isVisible: false, ...showAlertModal});
            //     },
            // });

        }
    }, []);


    const navigateToTutorial = async () => {
        await setCurrentUser(true, await setFirstAccessUser(currentUser.id));
        navigate.navigate("UserInformationStack", {screen: "Videos"});
    };

    const handleAgenda = state => {
        setIsShowingAgenda(!isShowingAgenda);
    };

    const confirmSchedule = checkedItems => {
        // confirmSchedules(checkedItems);
        // verifyNotification({
        //   name: notificationsMessages.notifications[0].name,
        //   verification: checkedItems.some(
        //     schedule => !schedule.checked && schedule.passedHour,
        //   ),
        //   method: () =>
        //     navigate.push("ApplicationStack", {
        //       screen: "UnconfirmedSchedules",
        //     }),
        // });
    };

    const fetchData = async (skip, limit) => {
        setRefresing(true);
        try {
            const {idSalon: salonId, idFunc: employeeId, employeeType} = currentUser

            await loadAllSchedules({employeeId, salonId, employeeType})
            setRefresing(false);
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

    const onDeleteSchedule = async scheduleToDelete => {
        handleLoading(true);
        try {
            await deleteSchedule(scheduleToDelete)
            handleLoading(false)
        } catch (error) {
            handleLoading(false);
            console.log(error);
        }
    };


    const onUpdateSchedule = async (data) => {
        handleLoading(true);
        try {
            await updateSchedule(data)
            handleLoading(false);

        } catch (error) {
            console.error(error)
            handleLoading(false);
        }
    };

    const onAnalyzeSchedule = async (analyzedSchedules) => {
        handleLoading(true);
        try {
            await analyzeSchedules(analyzedSchedules)
            handleLoading(false);

        } catch (error) {
            console.error(error)
            handleLoading(false);
        }
    }

    return (
        <S.Container>
            <Agenda
                isVisible={isShowingAgenda}
                color={Colors.PURPLE}
                handleModal={handleAgenda}
                calendarSchedule={calendarSchedule}
            />

            <List
                showMenu
                showAddButton
                fetchData={fetchData}
                refreshing={refreshing}
                searchPlaceHolder={"Procure pelo cliente agendado "}
                isOwner
                showHeader
                handleAgenda={handleAgenda}
                showProfileIcon
                headerText={"Calendário"}
                color={Colors.PURPLE}
                items={schedules}
                menuItems={["name", "tel", "email", "procedures"]}
                objectMenuItems={["client", "client", "client"]}
                itemType={"schedule"}
                listProperty={["name", "scheduleHour"]}
                analyzeItem={onAnalyzeSchedule}
                onDeleteItem={onDeleteSchedule}
                onUpdateItem={onUpdateSchedule}
                onAddNavigateTo={() =>
                    navigate.push("ApplicationStack", {
                        screen: "ScheduleRegister",
                        params: {schedule: [], date: moment(new Date()).format()},
                    })
                }
                onEditNavigateTo={item =>
                    navigate.push("ApplicationStack", {
                        screen: "ScheduleRegister",
                        params: {
                            schedule: item,
                            date: {date: moment(new Date()).format()},
                        },
                    })
                }
            />
        </S.Container>
    );
};
export default Schedules;
