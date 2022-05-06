import Parse from "parse/react-native";
import { SalonObject } from "./SalonService";
import { deleteScheduleProcedureByProcedureId } from "./ScheduleProcedureService";
import { EmployeeObject } from "./EmployeeService";
import { buildProcedure, buildProcedureList } from "../factory/ProcedureFactory";
import { convertToObj } from "../common/converters/GenericConverter";
import {ScheduleObject} from "./ScheduleService";

export const ProcedureObject = Parse.Object.extend("procedure");

export const getAllProceduresBySalonId = async (salonId) => {
  const ProcedureQuery = new Parse.Query(ProcedureObject);
  ProcedureQuery.equalTo("salon_id", new SalonObject({ objectId: salonId }));

  try {
    const procedures = await ProcedureQuery.find();

    return procedures.length ? buildProcedureList(convertToObj(procedures)) : [];

  } catch (e) {
    throw e;
  }
};

export const getProcedureById = async (procedureId) => {
  const ProcedureQuery = new Parse.Query(ProcedureObject);
  ProcedureQuery.equalTo("objectId", procedureId);

  try {
    const procedure = await ProcedureQuery.first();

    return buildProcedure(convertToObj(procedure));

  } catch (e) {
    throw e;
  }
};

export const getProcedureByName = async (procedureName) => {
  const ProcedureQuery = new Parse.Query(ProcedureObject);
  ProcedureQuery.equalTo("name", procedureName);

  try {
    const procedure = await ProcedureQuery.first();

    return buildProcedure(convertToObj(procedure));

  } catch (e) {
    throw e;
  }
};

export const saveProcedureParse = async (procedures) => {
  const proceduresParse = procedures.map(({
                                            maintenanceValue,
                                            maintenanceDays,
                                            name,
                                            duration,
                                            cost,
                                            commissionValue,
                                            commissionPercentage,
                                            employeeId,
                                            salonId,
                                            hasMaintenance,
                                            hasCommission,
                                            isPercentage,
                                            isFixedValue,
                                          }) => {

    const ProcedureParse = new ProcedureObject();
    ProcedureParse.set(
        "maintenance_value",
        hasMaintenance
            ? parseFloat(maintenanceValue.replace(".", "").replace(",", "."))
            : 0,
    );
    ProcedureParse.set(
        "maintenance_days",
        hasMaintenance ? parseInt(maintenanceDays) : 0,
    );
    //
    ProcedureParse.set(
        "commission_value",
        parseFloat(
            hasCommission && isFixedValue
                ? commissionValue.replace(".", "").replace(",", ".")
                : 0,
        ),
    );

    ProcedureParse.set(
        "commission_percentage",
        hasCommission && isPercentage
            ? parseFloat(commissionPercentage)
            : 0,
    );
    ProcedureParse.set("name", name);
    ProcedureParse.set("time", parseInt(duration));
    ProcedureParse.set(
        "value",
        parseFloat(cost.replace(".", "").replace(",", ".")),
    );

    if(employeeId) {
      ProcedureParse.set(
          "employee_id",
          new EmployeeObject({objectId: employeeId}),
      );
    }
    ProcedureParse.set("salon_id", new SalonObject({ objectId: salonId }));

    return ProcedureParse
  })

  try {
    const newProcedures = await Parse.Object.saveAll(proceduresParse)

    return buildProcedureList(convertToObj(newProcedures));
  } catch (e) {
    throw e;
  }
};

export const deleteProcedureParse = async (procedures) => {
  const proceduresToDelete = []

  procedures.forEach(({id}) => {
    proceduresToDelete.push(new ProcedureObject({objectId: id}))
  })

  try {
    await Parse.Object.destroyAll(proceduresToDelete);

  } catch (e) {
    throw e;
  }
};

export const updateProcedureParse = async (procedure) => {
  const {
    name,
    duration,
    cost,
    commissionValue,
    commissionPercentage,
    maintenanceValue,
    maintenanceDays,
    id,
    isFixedValue,
    hasMaintenance,
    hasCommission,
    isPercentage,
  } = procedure;

  const ProcedureParse = new ProcedureObject({ objectId: id });

  ProcedureParse.set(
    "maintenance_value",
    hasMaintenance
      ? parseFloat(maintenanceValue.replace(".", "").replace(",", "."))
      : 0,
  );
  ProcedureParse.set(
    "maintenance_days",
    hasMaintenance ? parseInt(maintenanceDays) : 0,
  );

  ProcedureParse.set(
    "commission_value",
    parseFloat(
      hasCommission && isFixedValue
        ? commissionValue.replace(".", "").replace(",", ".")
        : 0,
    ),
  );


  ProcedureParse.set(
    "commission_percentage",
    hasCommission && isPercentage
      ? parseFloat(commissionPercentage)
      : 0,
  );

  ProcedureParse.set("name", name);
  ProcedureParse.set("time", parseInt(duration));
  ProcedureParse.set(
    "value",
    parseFloat(cost.replace(".", "").replace(",", ".")),
  );

  try {
    const updatedProcedure = await ProcedureParse.save();
    return buildProcedure(convertToObj(updatedProcedure));


  } catch (e) {
    throw e;
  }
};
