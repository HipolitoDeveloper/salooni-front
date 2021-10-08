import {maskBRL} from '../pipe/inputMasks';

export const buildProcedureList = procedures => {
  return procedures.map(procedure => {
    return {
      id: procedure.objectId,
      name: procedure.name,
      commissionValue: maskBRL(procedure.commission_value),
      commissionPercentage: procedure.commission_percentage.toString(),
      isPercentage: procedure.commission_percentage !== 0,
      isFixedValue: procedure.commission_value !== 0,
      value: maskBRL(procedure.value),
      time: procedure.time.toString(),
      maintenanceValue: maskBRL(procedure.maintenance_value),
      maintenanceDays: procedure.maintenance_days.toString(),
    };
  });
};

export const buildProcedure = procedure => {
  return {
    id: procedure.objectId,
    name: procedure.name,
    commissionValue: maskBRL(procedure.commission_value),
    commissionPercentage: procedure.commission_percentage.toString(),
    isPercentage: procedure.commission_percentage !== 0,
    isFixedValue: procedure.commission_value !== 0,
    value: maskBRL(procedure.value),
    time: procedure.time.toString(),
    maintenanceValue: maskBRL(procedure.maintenance_value),
    maintenanceDays: procedure.maintenance_days.toString(),
  };
};
