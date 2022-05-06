import React, {useEffect} from "react";

import {useNavigation} from "@react-navigation/native";
import {validateInformationBeforeInsert} from "../../../services/CloudService";
import {getVideoByRef} from "../../../services/VideoService";
import {useUser} from "../../../hooks";
import TopTabBar from "../../../view/components/huge/TopTabBar";
import Colors from "../../../common/style/Colors";
import {useFormContext} from "react-hook-form";
import {saveEmployeeParse, saveEmployeesParse} from "../../../services/EmployeeService";
import {saveSalonParse} from "../../../services/SalonService";
import {saveProcedureParse} from "../../../services/ProcedureService";
import Constants from "../../../common/Constants";
import {useLayout} from "../../../hooks/Layout";
import Errors from "../../../common/Errors";


const SignupTabBar = ({state}) => {
    const {
        onSignup,
    } = useUser();
    const {handleModal, modal, handleLoading, clearModal} = useLayout();
    const {handleSubmit, formState: {errors}} = useFormContext();


    const pages = [
        {screen: "SignupOwners", name: "Salão"},
        {screen: "SignupProcedures", name: "Procedimentos"},
        {screen: "SignupPartners", name: "Parceiros"},
    ];
    const navigation = useNavigation();


    useEffect(() => {
        handleLoading(true);
        (async () => {
            Promise.all([getVideoByRef("PAB"), getVideoByRef("CAD")]).then(
                data => {
                    const video = {windowVideo: data[0], signupVideo: data[1]};
                    handleModal({...modal, visible: true, variant: "tutorial", tutorial: video});
                    handleLoading(false);
                },
                error => {
                    console.error(error);
                    handleLoading(false);
                });
        })();
    }, []);

    const validateSalonInformation = async (data) => {
        const {procedures, employees, ...owner} = data;
        try {

            console.log("data", data)
            await validateInformationBeforeInsert({
                procedures: procedures,
                employees: employees,
                owner: owner,
            });

            if (!employees.length || !procedures.length) {
                handleModal({
                    ...modal,
                    visible: true,
                    variant: "confirm",
                    title: Constants.ATTENTION,
                    text: !employees.length ? Constants.SIGNUP_WITHOUT_EMPLOYEES : Constants.SIGNUP_WITHOUT_PROCEDURES,
                    onOk: async () => {
                        clearModal();
                        await doSignup(data);
                    },
                });
            } else {
                await doSignup(data);
            }
        } catch (error) {
            console.error("validateSalonInformationError", error)
            handleModal({
                ...modal,
                visible: true,
                variant: "alert",
                errors: error,
            });
        }
    };

    const doSignup = async (data) => {
        const {salonName, employees, procedures, ...owner} = data;
        handleLoading(true);
        try {
            const salon = {salonName, cnpj: owner.cnpj, employeeQt: employees.length};
            const {id: salonId} = await saveSalonParse(salon);
            owner.salonId = salonId;
            owner.employeeType = "OWN";


            let savedProcedures = []
            if (procedures.length) {
                savedProcedures = await saveProcedureParse(procedures.map(procedure => {
                    return {...procedure, salonId: salonId}
                }))
            }


            owner.procedures = savedProcedures
            const {id: employeeId} = await saveEmployeeParse(owner);


            if (employees.length) {
                for (const employee of employees) {
                    employee.salonId = salonId;
                    employee?.procedures?.map(withoutIdProcedure => {
                        savedProcedures.forEach(procedures => {
                            if (withoutIdProcedure.name === procedures.name) {
                                withoutIdProcedure.id = procedures.id
                            }
                        })
                        return withoutIdProcedure
                    })
                }

                await saveEmployeesParse(employees);
            }

            owner.employee = {id: employeeId};
            await onSignup(owner);
            handleLoading(false);
            // handleModal({
            //   ...modal,
            //   visible: true,
            //   variant: "confirm",
            //   title: Constants.ATTENTION ,
            //   text: Constants.SIGNUP_SUCCESS,
            //   onOk: () => {console.log("Entrando")}
            // });

        } catch (error) {
            handleLoading(false);
            console.log("SignupTabBarError", error)
            handleModal({...modal, visible: true, errors:[{message: Errors.DUPLICATE_EMAIL_ERROR}]});
        }
    };


    const goBack = () => {
        navigation.navigate("EntranceStack", {screen: "SignInOwner"});
    };

    return (
        <TopTabBar
            color={Colors.PURPLE}
            pages={pages}
            state={state}
            navigation={navigation}
            onConfirm={handleSubmit(validateSalonInformation)}
            onCancel={goBack}
        />
    );
};

export default SignupTabBar;
