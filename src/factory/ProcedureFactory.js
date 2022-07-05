import {convertToBRL} from "../common/converters/GenericConverter";

export const buildProcedureList = procedures => {
    return procedures.map(procedure => {
        return {
            id: procedure.objectId,
            name: procedure.name,
            commissionValue: procedure.commission_value !== 0
                ? convertToBRL(procedure.commission_value)
                : '',
            commissionPercentage:
                procedure.commission_percentage !== 0
                    ? procedure.commission_percentage.toString()
                    : '',
            cost: convertToBRL(procedure.value),
            duration: procedure.time.toString(),
            maintenanceValue:
                procedure.maintenance_value !== 0
                    ? convertToBRL(procedure.maintenance_value)
                    : '',
            maintenanceDays:
                procedure.maintenance_days !== 0
                    ? procedure.maintenance_days.toString()
                    : '',
            hasCommission:
                procedure.commission_percentage !== 0 ||
                procedure.commission_value !== 0,

            hasMaintenance:
                procedure.maintenance_value !== 0,
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
        cost: convertToBRL(procedure.value),
        duration: procedure.time.toString(),
        maintenanceValue: convertToBRL(procedure.maintenance_value),
        maintenanceDays: procedure.maintenance_days.toString(),
        hasCommission:
            procedure.commission_percentage !== 0 ||
            procedure.commission_value !== 0,

        hasMaintenance:
            procedure.maintenance_value !== 0,

    };
};
