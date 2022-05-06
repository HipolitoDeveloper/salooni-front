import Errors from "../Errors";
import {convertBRLToFloat} from "../converters/GenericConverter";
import {getUsersByEmail} from "../../services/UserService";

export function cnpjValidator(message) {
    return this.test("test-cnpj", message, function (value) {
        const {path, createError} = this;

        if (value) {

            value = value.replace(/[^\d]+/g, "");

            if (
                value == "00000000000000" ||
                value == "11111111111111" ||
                value == "22222222222222" ||
                value == "33333333333333" ||
                value == "44444444444444" ||
                value == "55555555555555" ||
                value == "66666666666666" ||
                value == "77777777777777" ||
                value == "88888888888888" ||
                value == "99999999999999"
            ) {
                return createError({path, message: message});
            }


            // Valida DVs
            let tamanho = value.length - 2;
            let numeros = value.substring(0, tamanho);
            let digitos = value.substring(tamanho);
            let soma = 0;
            let pos = tamanho - 7;
            for (let i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2) pos = 9;
            }
            let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
            if (resultado != digitos.charAt(0)) {
                return createError({path, message: message});
            }

            tamanho = tamanho + 1;
            numeros = value.substring(0, tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (let i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2) pos = 9;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
            if (resultado != digitos.charAt(1)) {
                return createError({path, message: message});
            }

            return true;
        } else {
            return true;
        }
    });
}

export function cpfValidator(message) {
    return this.test("test-cpf", message, function (value) {
        const {path, createError} = this;

        if (value) {
            value = value.replace(/[^\d]+/g, "");
            if (value == "") {
                return createError({path, message: message});
            }
            if (
                value.length != 11 ||
                value == "00000000000" ||
                value == "11111111111" ||
                value == "22222222222" ||
                value == "33333333333" ||
                value == "44444444444" ||
                value == "55555555555" ||
                value == "66666666666" ||
                value == "77777777777" ||
                value == "88888888888" ||
                value == "99999999999"
            ) {
                return createError({path, message: message});
            }

            let add = 0;
            for (let i = 0; i < 9; i++) add += parseInt(value.charAt(i)) * (10 - i);
            let rev = 11 - (add % 11);
            if (rev == 10 || rev == 11) rev = 0;
            if (rev != parseInt(value.charAt(9))) {
                return createError({path, message: message});
            }

            add = 0;
            for (let i = 0; i < 10; i++) add += parseInt(value.charAt(i)) * (11 - i);
            rev = 11 - (add % 11);
            if (rev == 10 || rev == 11) rev = 0;
            if (rev != parseInt(value.charAt(10))) {
                return createError({path, message: message});
            }

            return true;
        } else {
            return true;

        }
    })
};

export function passwordValidator(message) {
    return this.test("test-password", message, function (value) {
        const {path, createError} = this;

        let specialCaracterRegex = /\W|_/;
        let hasUppercase = false;
        let hasLowercase = false;
        let errors = [];

        for (let letter of value) {
            let excludeSpecialCaracter = /[A-z]|_+/;
            if (excludeSpecialCaracter.test(letter)) {
                if (letter === letter.toLowerCase()) {
                    hasLowercase = true;
                }

                if (letter === letter.toUpperCase()) {
                    hasUppercase = true;
                }
            }
        }

        if (!hasUppercase) {
            errors.push(0);
            return createError({path, message: Errors.PASSWORD_UPPERCASE_ALERT});
        }

        if (!hasLowercase) {
            errors.push(1);
            return createError({path, message: Errors.PASSWORD_LOWERCASE_ALERT});
        }

        if (value.length < 6) {
            errors.push(2);
            return createError({path, message: Errors.PASSWORD_LENGTH_ALERT});
        }

        if (!specialCaracterRegex.test(value)) {
            errors.push(3);
            return createError({path, message: Errors.PASSWORD_SPECIAL_CHARACTER_ALERT});
        }

        return true;

    });
}

export function commissionValidator(message) {
    return this.test("test-commission", message, function (value) {
        const {path, createError, parent: {cost}} = this;

        if (cost && value) {

            const procedureValue = convertBRLToFloat(cost);
            const commissionValue = convertBRLToFloat(value);

            if (commissionValue > procedureValue) {
                return createError({path, message: Errors.MISMATCH_COMMISSION_ERROR});
            }
            return true;
        } else {
            return true;
        }


    });
}

export function ownerValidator(message) {
    return this.test("test-owner", message, function (value) {

        return new Promise(async (resolve, reject) => {
            const {path, createError} = this;
            try {
                const {employee: {employeeType}} = await getUsersByEmail(value.trim());
                if (employeeType !== "OWN") {
                    reject(createError({path, message: Errors.NOT_A_OWNER_ERROR}));
                }

                resolve(true)
            } catch (e) {
                reject(createError({path, message: Errors.NOTFOUND_EMAIL_ERROR}));
            }
        })

    });
}

export function employeeValidator(message) {
    return this.test("test-employee", message, function (value) {

        return new Promise(async (resolve, reject) => {
            const {path, createError} = this;
            try {
                const {employee: {employeeType}} = await getUsersByEmail(value.trim());
                if (employeeType !== "PRC") {
                    reject(createError({path, message: Errors.NOT_A_EMAIL_EMPLOYEE_ERROR}));
                }

                resolve(true)
            } catch (e) {
                reject(createError({path, message: Errors.NOTFOUND_EMAIL_ERROR}));
            }
        })

    });
}


export function matchPasswordValidator(message) {
    return this.test("match-password", message, function (value) {
        const {path, createError, parent: {password}} = this;

        if (password !== value) {
            return createError({path, message: Errors.MISMATCH_PASSWORD_ERROR})
        }

        return true;

    })
}


