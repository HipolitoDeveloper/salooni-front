import {maskBRL} from '../pipe/inputMasks';

export const buildProcedureList = procedures => {
  return procedures.map(procedure => {
    return {
      id: procedure.objectId,
      name: procedure.name,
      commissionValue:
        procedure.commission_value !== 0
          ? maskBRL(procedure.commission_value)
          : '',
      commissionPercentage:
        procedure.commission_percentage !== 0
          ? procedure.commission_percentage.toString()
          : '',
      isPercentage: procedure.commission_percentage !== 0,

      isFixedValue: procedure.commission_value !== 0,
      value: maskBRL(procedure.value),
      time: procedure.time.toString(),
      maintenanceValue:
        procedure.maintenance_value !== 0
          ? maskBRL(procedure.maintenance_value)
          : '',
      maintenanceDays:
        procedure.maintenance_days !== 0
          ? procedure.maintenance_days.toString()
          : '',
      hasCommission: {
        state:
          procedure.commission_percentage !== 0 ||
          procedure.commission_value !== 0,
        text:
          procedure.commission_percentage !== 0 ||
          procedure.commission_value !== 0
            ? 'check'
            : 'times',
      },
      hasMaintenance: {
        state: procedure.maintenance_value !== 0,
        text: procedure.maintenance_value !== 0 ? 'check' : 'times',
      },
    };
  });
};

export const buildProcedure = procedure => {
  return {
    id: procedure.objectId,
    name: procedure.name,
    commissionValue:
      procedure.commission_value !== 0
        ? maskBRL(procedure.commission_value)
        : '',
    commissionPercentage:
      procedure.commission_percentage !== 0
        ? procedure.commission_percentage.toString()
        : '',
    isPercentage: procedure.commission_percentage !== 0,
    isFixedValue: procedure.commission_value !== 0,
    value: maskBRL(procedure.value),
    time: procedure.time.toString(),
    maintenanceValue: maskBRL(procedure.maintenance_value),
    maintenanceDays: procedure.maintenance_days.toString(),
    hasCommission: {
      state:
        procedure.commission_percentage !== 0 ||
        procedure.commission_value !== 0,
      text:
        procedure.commission_percentage !== 0 ||
        procedure.commission_value !== 0
          ? 'check'
          : 'times',
    },
    hasMaintenance: {
      state: procedure.maintenance_value !== 0,
      text: procedure.maintenance_value !== 0 ? 'check' : 'times',
    },
  };
};
