import * as yup from "yup";
import Errors from "../Errors";
import {
    cnpjValidator,
    commissionValidator,
    cpfValidator,
    employeeValidator,
    matchPasswordValidator,
    ownerValidator,
    passwordValidator
} from "./Methods";

yup.addMethod(yup.string, "passwordValidator", passwordValidator);
yup.addMethod(yup.string, "commissionValidator", commissionValidator);
yup.addMethod(yup.string, "cnpjValidator", cnpjValidator);
yup.addMethod(yup.string, "cpfValidator", cpfValidator);
yup.addMethod(yup.string, "ownerValidator", ownerValidator);
yup.addMethod(yup.string, "employeeValidator", employeeValidator);
yup.addMethod(yup.string, "matchPasswordValidator", matchPasswordValidator);

export const signupValidationSchema = yup.object().shape({
    salonName: yup.string().required(Errors.SALONNAME_REQUIRED_ALERT),
    cnpj: yup
        .string()
        .required(Errors.CNPJ_REQUIRED_ALERT)
        .length(14, Errors.CNPJ_VALIDATOR_ALERT)
        .cnpjValidator(Errors.CNPJ_VALIDATOR_ALERT),
    userName: yup.string().required(Errors.OWNER_REQUIRED_ALERT),
    tel: yup
        .string()
        .required(Errors.TEL_REQUIRED_ALERT)
        .length(11, Errors.TEL_VALIDATOR_ALERT),
    email: yup
        .string()
        .required(Errors.EMAIL_REQUIRED_ALERT)
        .email(Errors.EMAIL_VALIDATOR_ALERT),
    password: yup
        .string()
        .required(Errors.PASSWORD_REQUIRED_ALERT)
        .passwordValidator(),
    procedures: yup.array(),
});

export const procedureValidationSchema = yup.object().shape({
    name: yup.string().required(Errors.PROCEDURENAME_REQUIRED_ALERT),
    duration: yup.string().required(Errors.DURATION_REQUIRED_ALERT),
    cost: yup.string().required(Errors.COST_REQUIRED_ALERT),
    hasMaintenance: yup.boolean(),
    maintenanceValue: yup.string().when("hasMaintenance", {
        is: true,
        then: yup.string().required(Errors.MAINTENANCE_REQUIRED_ALERT),
        otherwise: yup.string().notRequired(),
    }),
    maintenanceDays: yup.string().when("hasMaintenance", {
        is: true,
        then: yup.string().required(Errors.MAINTENANCE_REQUIRED_ALERT),
        otherwise: yup.string().notRequired(),
    }),
    commissionFixedValue: yup.string().commissionValidator(),
    commissionPercentage: yup.string(),
});

export const employeeValidationSchema = yup.object().shape({
    userName: yup.string().required(Errors.EMPLOYEENAME_REQUIRED_ALERT),
    email: yup.string().email().required(Errors.EMAIL_REQUIRED_ALERT),
    tel: yup.string().required(Errors.TEL_REQUIRED_ALERT),
    cnpj: yup
        .string()
        .length(14, Errors.CNPJ_VALIDATOR_ALERT)
        .cnpjValidator(Errors.CNPJ_VALIDATOR_ALERT),
});

export const signinValidationSchema = yup.object().shape({
    email: yup.string().required().email().ownerValidator(),
    password: yup.string().required(),
});

export const employeeSigninValidationSchema = yup.object().shape({
    email: yup.string().required().email().employeeValidator(),
    password: yup.string().required(),
});

export const employeeSignupValidationSchema = yup.object().shape({
    password: yup.string().required(),
    confirmPassword: yup.string().matchPasswordValidator(),
});

export const profileUpdateValidationSchema = yup.object().shape({
    userName: yup.string().required(),
    salonName: yup.string().required(),
    cnpj: yup
        .string()
        .required(Errors.CNPJ_REQUIRED_ALERT)
        .length(14, Errors.CNPJ_VALIDATOR_ALERT)
        .cnpjValidator(Errors.CNPJ_VALIDATOR_ALERT),
    email: yup.string().email().required(Errors.EMAIL_REQUIRED_ALERT),
});

export const clientValidationSchema = yup.object().shape({
    name: yup.string().required(Errors.NAME_REQUIRED_ALERT),
    email: yup.string().required(Errors.EMAIL_REQUIRED_ALERT),
    cpf: yup.string().required(Errors.CPF_REQUIRED_ALERT).cpfValidator(Errors.CPF_VALIDATOR_ALERT),
    bornDate: yup.string(),
    tel: yup.string().required(Errors.TEL_REQUIRED_ALERT),
    tel2: yup.string(),
})

export const scheduleValidationSchema = yup.object().shape({
    client: yup.object().required(Errors.CLIENT_REQUIRED_ALERT),
    employee: yup.object().required(Errors.EMPLOYEE_REQUIRED_ALERT),
    procedures: yup.array().required(Errors.PROCEDURES_REQUIRED_ALERT),
    scheduleDate: yup.string(),

})
