import {maskBRL, teste} from '../pipe/inputMasks';
import {convertToBRL} from '../pipe/conversor';

export const buildProcedureList = procedures => {
  return procedures.map(procedure => {
    return {
      id: procedure.objectId,
      name: procedure.name,
      commissionValue: procedure.commission_value
        ? convertToBRL(procedure.commission_percentage)
        : '',
      commissionPercentage:
        procedure.commission_percentage !== 0
          ? procedure.commission_percentage.toString()
          : '',
      isPercentage: procedure.commission_percentage !== 0,

      isFixedValue: procedure.commission_value !== 0,
      value: convertToBRL(procedure.value),
      time: procedure.time.toString(),
      maintenanceValue:
        procedure.maintenance_value !== 0
          ? convertToBRL(procedure.maintenance_value)
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
        ? convertToBRL(procedure.commission_value)
        : '',
    commissionPercentage:
      procedure.commission_percentage !== 0
        ? procedure.commission_percentage.toString()
        : '',
    isPercentage: procedure.commission_percentage !== 0,
    isFixedValue: procedure.commission_value !== 0,
    value: convertToBRL(procedure.value),
    time: procedure.time.toString(),
    maintenanceValue: convertToBRL(procedure.maintenance_value),
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
