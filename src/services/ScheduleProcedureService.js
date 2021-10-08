import Parse from 'parse/react-native';
import {convertToObj} from '../pipe/conversor';
import {getScheduleByProcedureId, ScheduleObject} from './ScheduleService';
import {buildScheduleProcedure} from '../factory/Schedule';
import {ProcedureObject} from './ProcedureService';

const ScheduleProcedureObject = Parse.Object.extend('schedule_procedure');

export const getScheduleProcedureByScheduleId = (
  scheduleFK,
  returnParseObject,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const ScheduleProcedureQuery = new Parse.Query(ScheduleProcedureObject);
      ScheduleProcedureQuery.equalTo(
        'schedule_id',
        new ScheduleObject({objectId: scheduleFK}),
      );
      ScheduleProcedureQuery.include('procedure_id');

      if (returnParseObject) {
        resolve(await ScheduleProcedureQuery.find());
      } else {
        resolve(
          buildScheduleProcedure(
            convertToObj(await ScheduleProcedureQuery.find()),
          ),
        );
      }
    } catch (e) {
      console.error(`Procedimentos do agendamento ${e}`);
      reject(`Procedimentos do agendamento ${JSON.stringify(e)}`);
    }
  });
};

export const getScheduleProcedureByProcedureId = (
  procedureId,
  returnParseObject,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const ScheduleProcedureQuery = new Parse.Query(ScheduleProcedureObject);
      ScheduleProcedureQuery.equalTo(
        'procedure_id',
        new ProcedureObject({objectId: procedureId}),
      );

      if (returnParseObject) {
        resolve(await ScheduleProcedureQuery.find());
      } else {
        resolve(
          buildScheduleProcedure(
            convertToObj(await ScheduleProcedureQuery.find()),
          ),
        );
      }
    } catch (e) {
      console.error(`Procedimentos do agendamento ${e}`);
      reject(`Procedimentos do agendamento ${JSON.stringify(e)}`);
    }
  });
};

// export const getProcedureEmployeeByProcedureId = (
//   procedureId,
//   returnParseObject,
// ) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const procedure = await getProcedureById(procedureId, true);
//
//       const ProcedureEmployeeQuery = new Parse.Query(ProcedureEmployeeObject);
//       ProcedureEmployeeQuery.equalTo('procedure_id', procedure);
//       ProcedureEmployeeQuery.include('IdFuncFK');
//
//       if (returnParseObject) {
//         resolve(await ProcedureEmployeeQuery.find());
//       } else {
//         resolve(convertToObj(await ProcedureEmployeeQuery.find()));
//       }
//     } catch (e) {
//       reject(`Procedimento ${JSON.stringify(e)}`);
//     }
//   });
// };

export const getScheduleProcedureById = (
  scheduleProcedureId,
  returnParseObject,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const ScheduleProcedureQuery = new Parse.Query(ScheduleProcedureObject);
      ScheduleProcedureQuery.equalTo('objectId', scheduleProcedureId);

      if (returnParseObject) {
        resolve(await ScheduleProcedureQuery.first());
      } else {
        resolve(convertToObj(await ScheduleProcedureQuery.first()));
      }
    } catch (e) {
      console.error(`Procedimentos do agendamento ${e}`);
      reject(`Procedimentos do agendamento ${JSON.stringify(e)}`);
    }
  });
};

export const saveScheduleProcedure = (
  scheduleProcedureObj,
  returnParseObject,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {procedureId, scheduleId} = scheduleProcedureObj;

      const newScheduleProcedure = new ScheduleProcedureObject();

      newScheduleProcedure.set('schedule_id', scheduleId);
      newScheduleProcedure.set('procedure_id', procedureId);

      newScheduleProcedure.save().then(
        savedProcedureEmployee => {
          if (returnParseObject) {
            resolve(savedProcedureEmployee);
          } else {
            resolve(convertToObj(savedProcedureEmployee));
          }
        },
        error => {
          console.error(`Procedimentos do agendamento ${error}`);
          reject(`Procedimentos do agendamento ${JSON.stringify(e)}`);
        },
      );
    } catch (e) {
      console.error(`Procedimentos do agendamento ${e}`);
      reject(`Procedimentos do agendamento ${JSON.stringify(e)}`);
    }
  });
};

export const deleteScheduleProcedureById = (
  scheduleProcedureId,
  returnParseObject,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const scheduleProcedure = new ScheduleProcedureObject({
        objectId: scheduleProcedureId,
      });

      scheduleProcedure.destroy().then(deletedScheduleProcedure => {
        if (returnParseObject) {
          resolve(deletedScheduleProcedure);
        } else {
          resolve(convertToObj(deletedScheduleProcedure));
        }
      });
    } catch (e) {
      console.error(`Procedimentos do agendamento ${e}`);
      reject(`Procedimentos do agendamento ${JSON.stringify(e)}`);
    }
  });
};

export const deleteScheduleProcedureByScheduleId = async schedule => {
  try {
    const scheduleProcedure = await getScheduleProcedureByScheduleId(
      schedule.id,
      true,
    );

    if (scheduleProcedure.length > 0)
      scheduleProcedure.map(async sp => {
        await sp.destroy();
      });
  } catch (e) {
    console.error(`Procedimentos do agendamento ${e}`);
  }
};

export const deleteScheduleProcedureByProcedureId = async procedureId => {
  try {
    const scheduleProcedures = await getScheduleProcedureByProcedureId(
      procedureId,
      true,
    );

    scheduleProcedures.map(async sp => {
      await sp.destroy();
    });
  } catch (e) {
    console.error(`Procedimentos do agendamento ${e}`);
  }
};
//
// export const deleteProcedureEmployeeByProcedureId = async procedureId => {
//   try {
//     const proceduresEmployee = await getProcedureEmployeeByProcedureId(
//       procedureId,
//       true,
//     );
//     proceduresEmployee.map(async pe => {
//       await pe.destroy();
//     });
//   } catch (e) {
//     console.error(`Procedimento ${JSON.stringify(e)}`);
//   }
// };
