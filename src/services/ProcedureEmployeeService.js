import Parse from "parse/react-native";
import { EmployeeObject } from "./EmployeeService";
import { ProcedureObject } from "./ProcedureService";
import { buildProcedureEmployee, buildProcedureEmployeeList } from "../factory/EmployeeFactory";
import { convertToObj } from "../common/converters/GenericConverter";

const ProcedureEmployeeObject = Parse.Object.extend("employee_procedure");

export const getEmployeeProcedureByEmployeeId = async (
  employeeId,
) => {
  const employee = new EmployeeObject({ objectId: employeeId });

  const ProcedureEmployeeQuery = new Parse.Query(ProcedureEmployeeObject);
  ProcedureEmployeeQuery.equalTo("employee_id", employee);
  ProcedureEmployeeQuery.include("procedure_id");
  ProcedureEmployeeQuery.include("employee_id");

  try {
    const employeeProcedures = await ProcedureEmployeeQuery.find();

    return employeeProcedures.length ? buildProcedureEmployeeList(convertToObj(employeeProcedures)) : [];

  } catch (e) {
    throw e;
  }
};

export const getEmployeeProcedureByProcedureId = async (
  procedureId,
) => {
  const procedure = new ProcedureObject({ objectId: procedureId });

  const ProcedureEmployeeQuery = new Parse.Query(ProcedureEmployeeObject);
  ProcedureEmployeeQuery.equalTo("procedure_id", procedure);
  ProcedureEmployeeQuery.include("employee_id");

  try {
    const employeeProcedures = await ProcedureEmployeeQuery.find();

    return employeeProcedures.length ? buildProcedureEmployeeList(convertToObj(employeeProcedures)) : [];

  } catch (e) {
    throw e;
  }
};

export const getEmployeeProcedureById = async (
  procedureEmployeeId,
) => {
  const ProcedureEmployeeQuery = new Parse.Query(ProcedureEmployeeObject);
  ProcedureEmployeeQuery.equalTo("objectId", procedureEmployeeId);

  try {
    const employeeProcedure = await ProcedureEmployeeQuery.first();

    return buildProcedureEmployee(convertToObj(employeeProcedure));
  } catch (e) {
    throw e;
  }
};

export const saveEmployeeProcedureParse = async (
  employeeProcedure,
) => {
  const { procedureId, employeeId } = employeeProcedure;
  const newProcedureEmployee = new ProcedureEmployeeObject();
  newProcedureEmployee.set(
    "employee_id",
    new EmployeeObject({ objectId: employeeId }),
  );
  newProcedureEmployee.set(
    "procedure_id",
    new ProcedureObject({ objectId: procedureId }),
  );

  try {
    const savedProcedureEmployee = await newProcedureEmployee.save();
    return buildProcedureEmployee(convertToObj(savedProcedureEmployee));

  } catch (e) {
    throw e;
  }
};

export const deleteEmployeeProcedureParse = async (
  procedureEmployeeId,
) => {
  const employeeProcedure = new ProcedureEmployeeObject({
    objectId: procedureEmployeeId,
  });
  try {
    const deletedProcedureEmployee = await employeeProcedure.destroy();
    return buildProcedureEmployee(convertToObj(deletedProcedureEmployee));

  } catch (e) {
    throw e;
  }
};

export const deleteEmployeeProceduresByEmployeeId = async employeeId => {
  const employeeProcedures = await getEmployeeProcedureByEmployeeId(employeeId);

  try {
    for (const employeeProcedure of employeeProcedures) {
      await employeeProcedure.destroy();

    }
  } catch (e) {
    throw e;
  }
};

export const deleteEmployeeProceduresByProcedureId = async procedureId => {
  const employeeProcedures = await getEmployeeProcedureByProcedureId(procedureId);
  try {
    for (const employeeProcedure of employeeProcedures) {
      await employeeProcedure.destroy();

    }
  } catch (e) {
    throw e;
  }
};
