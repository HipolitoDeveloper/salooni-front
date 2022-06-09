import Parse from "parse/react-native";
import {SalonObject} from "./SalonService";
import {buildEmployeeList, buildEmployeeObject} from "../factory/EmployeeFactory";
import {deleteSchedulesByEmployees} from "./ScheduleService";
import {convertToObj} from "../common/converters/GenericConverter";
import Errors from "../common/Errors";

export const EmployeeObject = Parse.Object.extend("employee");

export const getAllEmployeesBySalonId = async (salonId) => {
    const salon = new SalonObject({objectId: salonId});
    const EmployeeQuery = new Parse.Query(EmployeeObject);
    // EmployeeQuery.equalTo('employee_type', 'PRC');
    EmployeeQuery.equalTo("salon_id", salon);
    // EmployeeQuery.limit(limit)
    // EmployeeQuery.skip(skip)
    try {
        const employees = await EmployeeQuery.find();
        return employees.length ? buildEmployeeList(convertToObj(await EmployeeQuery.find())) : [];

    } catch (e) {
        throw e;
    }
};

export const getEmployeeByEmail = async (employeeEmail) => {
    const EmployeeQuery = new Parse.Query(EmployeeObject);
    EmployeeQuery.equalTo("email", employeeEmail.trim());
    EmployeeQuery.include("salon_id");

    try {
        const employee = await EmployeeQuery.first();

        if(employee) {
            return buildEmployeeObject(convertToObj(employee));
        } else {
           throw Errors.NOT_A_EMAIL_EMPLOYEE_ERROR
        }

    } catch (e) {
        throw e;
    }
};

export const getEmployeeById = async (employeeId) => {
    const EmployeeQuery = new Parse.Query(EmployeeObject);
    EmployeeQuery.equalTo("objectId", employeeId);

    try {
        const employee = await EmployeeQuery.first();
        return buildEmployeeObject(convertToObj(employee));

    } catch (e) {
        throw e;
    }
};

export const saveEmployeeParse = async (employee) => {
    const {cnpj, tel, tel2, employeeType, name, salonId, email, procedures} =
        employee;
    const EmployeeParse = new EmployeeObject();
    EmployeeParse.set("name", name.trim());
    EmployeeParse.set("cnpj", cnpj);
    EmployeeParse.set("employee_type", employeeType);
    EmployeeParse.set("tel", tel);
    EmployeeParse.set("tel2", tel2);
    EmployeeParse.set("salon_id", new SalonObject({objectId: salonId}));
    EmployeeParse.set("email", email.trim());
    EmployeeParse.set("procedures", JSON.stringify(procedures?.map(procedure => {
        return {id: procedure.id}
    }) ?? []))


    try {
        const savedEmployee = await EmployeeParse.save();

        return buildEmployeeObject(
            convertToObj(savedEmployee),
            procedures,
        );
    } catch (e) {
        throw e;
    }
};

export const saveEmployeesParse = async (employees) => {

    const employeesParse = employees.map(employee => {
        const {cnpj, tel, tel2, employeeType, name, salonId, email, procedures} =
            employee;
        const EmployeeParse = new EmployeeObject();
        EmployeeParse.set("name", name.trim());
        EmployeeParse.set("cnpj", cnpj);
        EmployeeParse.set("employee_type", employeeType);
        EmployeeParse.set("tel", tel);
        EmployeeParse.set("tel2", tel2);
        EmployeeParse.set("salon_id", new SalonObject({objectId: salonId}));
        EmployeeParse.set("email", email.trim());
        EmployeeParse.set("procedures", JSON.stringify(procedures?.map(procedure => {
            return {id: procedure.id}
        }) ?? []))

        return EmployeeParse
    })
    try {
        const savedEmployee = await Parse.Object.saveAll(employeesParse);
    } catch (e) {
        throw e;
    }
};


export const deleteEmployeeParse = async (employees) => {
    const employeesToDelete = []

    employees.forEach(({id}) => {
        employeesToDelete.push(new EmployeeObject({objectId: id}))
    })

    try {
        await deleteSchedulesByEmployees(employeesToDelete.map(employee => {
            return employee.id
        }));
        await Parse.Object.destroyAll(employeesToDelete);

    } catch (e) {
        throw e;
    }
};

export const updateEmployeeParse = async (employee) => {
        const {
            name,
            tel,
            tel2,
            cnpj,
            email,
            procedures,
            id,
        } = employee;
        const EmployeeParse = new EmployeeObject({objectId: id});

        EmployeeParse.set("name", name.trim());
        EmployeeParse.set("cnpj", cnpj);
        EmployeeParse.set("tel", tel);
        EmployeeParse.set("tel2", tel2);
        EmployeeParse.set("email", email.trim());
        EmployeeParse.set("procedures", JSON.stringify(procedures.map(procedure => {
            return {id: procedure.id}
        }) ?? []))

        try {
            const savedEmployee = await EmployeeParse.save();
            return buildEmployeeObject(convertToObj(savedEmployee));
        } catch (e) {
            throw  e;
        }
    };


export const updateEmployeesParse = async (employees) => {
    const employeesParse = employees.map(({
                       name,
                       tel,
                       tel2,
                       cnpj,
                       email,
                       procedures,
                       id,
                   }) => {
        const EmployeeParse = new EmployeeObject({objectId: id});
        EmployeeParse.set("name", name.trim());
        EmployeeParse.set("cnpj", cnpj);
        EmployeeParse.set("tel", tel);
        EmployeeParse.set("tel2", tel2);
        EmployeeParse.set("email", email.trim());
        EmployeeParse.set("procedures", JSON.stringify(procedures.map(procedure => {
            return {id: procedure.id}
        }) ?? []))

        return EmployeeParse
    })

    try {
        const savedEmployee = await Parse.Object.saveAll(employeesParse);
        return buildEmployeeList(convertToObj(savedEmployee));
    } catch (e) {
        throw  e;
    }
};

