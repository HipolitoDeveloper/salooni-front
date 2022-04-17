import Parse from "parse/react-native";
import {SalonObject} from "./SalonService";
import {
    deleteEmployeeProcedureParse,
    deleteEmployeeProceduresByEmployeeId,
    saveEmployeeProcedureParse,
} from "./ProcedureEmployeeService";
import {getProcedureByName} from "./ProcedureService";
import {buildEmployeeList, buildEmployeeObject} from "../factory/EmployeeFactory";
import {deleteSchedulesByEmployeeId} from "./ScheduleService";
import {convertToObj} from "../common/converters/GenericConverter";

export const EmployeeObject = Parse.Object.extend("employee");

export const getAllEmployeesBySalonId = async (salonId) => {

    const salon = new SalonObject({objectId: salonId});
    const EmployeeQuery = new Parse.Query(EmployeeObject);
    // EmployeeQuery.equalTo('employee_type', 'PRC');
    EmployeeQuery.equalTo("salon_id", salon);
    //
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

        return buildEmployeeObject(convertToObj(employee));

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

export const saveEmployeeParse = async (employee, isSigningUp) => {
    const {cnpj, tel, tel2, employeeType, userName, salonId, email, procedures} =
        employee;
    const EmployeeParse = new EmployeeObject();
    EmployeeParse.set("name", userName.trim());
    EmployeeParse.set("cnpj", cnpj);
    EmployeeParse.set("employee_type", employeeType);
    EmployeeParse.set("tel", tel);
    EmployeeParse.set("tel2", tel2);
    EmployeeParse.set("salon_id", new SalonObject({objectId: salonId}));
    EmployeeParse.set("email", email.trim());
    EmployeeParse.set("procedures", procedures.map(procedure => {return procedure.id}))


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


export const deleteEmployeeParse = async (employeeId) => {
    const partner = new EmployeeObject({objectId: employeeId});
    await deleteEmployeeProceduresByEmployeeId(employeeId);
    await deleteSchedulesByEmployeeId(employeeId, false);


    try {
        const deletedEmployee = await partner.destroy();

        return convertToObj(deletedEmployee);

    } catch (e) {
        throw e;
    }
};


export const deleteEmployeesParse = async employees => {
    try {
        for (const employee of employees) {
            const EmployeeParse = new EmployeeObject({objectId: employee.id});
            await EmployeeParse.destroy();
            await deleteEmployeeProceduresByEmployeeId(employee.id);
            await deleteSchedulesByEmployeeId(employee.id, false);
        }
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
            procedureListWithoutChanges,
            id,
            firstAcess
        } = employee;
        const EmployeeParse = new EmployeeObject({objectId: id});

        EmployeeParse.set("name", name.trim());
        EmployeeParse.set("cnpj", cnpj);
        EmployeeParse.set("tel", tel);
        EmployeeParse.set("tel2", tel2);
        EmployeeParse.set("email", email.trim());
        EmployeeParse.set("first_access", false);


        try {
            const savedEmployee = await EmployeeParse.save();

            return buildEmployeeObject(convertToObj(savedEmployee));

        } catch (e) {
            throw  e;
        }

    }
;
