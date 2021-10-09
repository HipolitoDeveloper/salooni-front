import Parse from 'parse/react-native';
import {convertToObj} from '../pipe/conversor';
import {EmployeeObject} from './EmployeeService';
import {ClientObject} from './ClientService';
import {buildSchedule, buildScheduleList} from '../factory/Schedule';
import {ProcedureObject} from './ProcedureService';
import {
  deleteScheduleProcedureById,
  saveScheduleProcedure,
} from './ScheduleProcedureService';
import {SalonObject} from './SalonService';

export const ScheduleObject = Parse.Object.extend('schedule');

export const getAllSchedules = (
  employeeId,
  salonId,
  employeeType,
  returnParseObject,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const ScheduleQuery = new Parse.Query(ScheduleObject);
      ScheduleQuery.equalTo('salon_id', new SalonObject({objectId: salonId}));
      if (employeeType === 'PRC') {
        ScheduleQuery.equalTo(
          'employee_id',
          new EmployeeObject({objectId: employeeId}),
        );
      }
      ScheduleQuery.include('employee_id');
      ScheduleQuery.include('client_id');
      const schedules = await ScheduleQuery.find();
      if (returnParseObject) {
        resolve(schedules);
      } else {
        if (schedules.length > 0)
          resolve(await buildScheduleList(convertToObj(schedules)));
        else resolve([]);
      }
    } catch (e) {
      console.error(`Agendamento  lista ${e}`);
      reject(`Agendamento lista ${JSON.stringify(e)}`);
    }
  });
};
// Padrões SOLID
// Padrões OO
export const insertScheduleCRUD = (scheduleObj, returnParseObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        client,
        employee,
        procedures,
        scheduleDate,
        analyzedSchedule,
        salonId,
      } = scheduleObj;

      const schedule = new ScheduleObject();
      schedule.set('employee_id', new EmployeeObject({objectId: employee.id}));
      schedule.set('client_id', new ClientObject({objectId: client.id}));
      schedule.set('salon_id', new SalonObject({objectId: salonId}));
      // schedule.set('Observacao', 'Teste');
      schedule.set('schedule_date', scheduleDate.toString());
      // schedule.set('analyzed_schedule', analyzedSchedule);

      schedule.save().then(async schedule => {
        for (const procedure of procedures) {
          const scheduleProcedure = await saveScheduleProcedure(
            {
              procedureId: new ProcedureObject({objectId: procedure.id}),
              scheduleId: new ScheduleObject({objectId: schedule.id}),
            },
            false,
          );

          procedures.scheduleProcedureId = scheduleProcedure.objectId;
        }

        if (returnParseObject) {
          resolve(schedule);
        } else {
          resolve(buildSchedule(convertToObj(schedule), procedures));
        }
      });
    } catch (e) {
      console.error(`Agendamento ${e}`);
      reject(`Agendamento ${JSON.stringify(e)}`);
    }
  });
};

export const updateScheduleCRUD = (scheduleObj, returnParseObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        id,
        client,
        employee,
        procedures,
        procedureListWithoutChanges,
        scheduleDate,
      } = scheduleObj;
      const schedule = new ScheduleObject({objectId: id});
      schedule.set('employee_id', new EmployeeObject({objectId: employee.id}));
      schedule.set('client_id', new ClientObject({objectId: client.id}));
      // schedule.set('Observacao', 'Teste');
      schedule.set('schedule_date', scheduleDate.toString());

      schedule.save().then(async schedule => {
        if (returnParseObject) {
          resolve(schedule);
        } else {
          for (const procedure of procedureListWithoutChanges) {
            if (!procedures.some(p => p.name === procedure.name)) {
              await deleteScheduleProcedureById(procedure.scheduleProcedureId);
            }
          }

          for (const procedure of procedures) {
            if (
              !procedureListWithoutChanges.some(pl => pl.id === procedure.id)
            ) {
              const scheduleProcedure = await saveScheduleProcedure(
                {
                  procedureId: new ProcedureObject({objectId: procedure.id}),
                  scheduleId: schedule,
                },
                false,
              );

              procedure.scheduleProcedureId = scheduleProcedure.objectId;
            }
          }

          resolve(buildSchedule(convertToObj(schedule), procedures));
        }
      });
    } catch (e) {
      console.error(`Agendamento ${e}`);
      reject(`Agendamento ${JSON.stringify(e)}`);
    }
  });
};

export const deleteScheduleCRUD = (schedule, returnParseObject) => {
  const {id, procedureListWithoutChanges} = schedule;

  return new Promise(async (resolve, reject) => {
    try {
      const schedule = new ScheduleObject({objectId: id});
      schedule.destroy().then(deletedSchedule => {
        procedureListWithoutChanges.map(async ({scheduleProcedureId}) => {
          await deleteScheduleProcedureById(scheduleProcedureId);
        });

        if (returnParseObject) {
          resolve(deletedSchedule);
        } else {
          resolve(buildSchedule(convertToObj(deletedSchedule), []));
        }
      });
    } catch (e) {
      console.error(`Agendamento ${e}`);
      reject(`Agendamento ${JSON.stringify(e)}`);
    }
  });
};

export const deleteScheduleByClientId = async (clientId, returnParseObject) => {
  try {
    const schedule = await getScheduleByClientId(clientId, true);

    schedule.map(async s => {
      await s.destroy();
    });
  } catch (e) {
    console.error(`Agendamento ${e}`);
    console.error(`Agendamento ${JSON.stringify(e)}`);
  }
};

export const deleteScheduleByEmployeeId = async employeeId => {
  try {
    const schedule = await getScheduleByEmployeeId(employeeId, true);

    schedule.map(async s => {
      await s.destroy();
    });
  } catch (e) {
    console.error(`Agendamento ${e}`);
  }
};

export const getScheduleByClientId = (clientId, returnParseObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      const ScheduleQuery = new Parse.Query(ScheduleObject);
      ScheduleQuery.equalTo(
        'client_id',
        new ClientObject({objectId: clientId}),
      );
      // ScheduleQuery.include('procedure_id');
      // ScheduleQuery.include('client_id');

      if (returnParseObject) {
        resolve(await ScheduleQuery.find());
      } else {
        const schedules = await ScheduleQuery.find();
        if (schedules.length > 0)
          resolve(
            await buildScheduleList(convertToObj(await ScheduleQuery.find())),
          );
        else resolve([]);
      }
    } catch (e) {
      console.error(`Agendamento ${e}`);
      reject(`Agendamento ${JSON.stringify(e)}`);
    }
  });
};

export const getScheduleByProcedureId = (procedureId, returnParseObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      const ScheduleQuery = new Parse.Query(ScheduleObject);
      ScheduleQuery.equalTo(
        'client_id',
        new ProcedureObject({objectId: procedureId}),
      );
      // ScheduleQuery.include('procedure_id');
      // ScheduleQuery.include('client_id');

      if (returnParseObject) {
        resolve(await ScheduleQuery.find());
      } else {
        const schedules = await ScheduleQuery.find();
        if (schedules.length > 0)
          resolve(
            await buildScheduleList(convertToObj(await ScheduleQuery.find())),
          );
        else resolve([]);
      }
    } catch (e) {
      console.error(`Agendamento ${e}`);

      reject(`Agendamento ${JSON.stringify(e)}`);
    }
  });
};

export const getScheduleByEmployeeId = (employeeId, returnParseObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      const ScheduleQuery = new Parse.Query(ScheduleObject);
      ScheduleQuery.equalTo(
        'employee_id',
        new EmployeeObject({objectId: employeeId}),
      );
      // ScheduleQuery.include('procedure_id');
      // ScheduleQuery.include('client_id');

      if (returnParseObject) {
        resolve(await ScheduleQuery.find());
      } else {
        const schedules = await ScheduleQuery.find();
        if (schedules.length > 0)
          resolve(
            await buildScheduleList(convertToObj(await ScheduleQuery.find())),
          );
        else resolve([]);
      }
    } catch (e) {
      console.error(`Agendamento ${e}`);

      reject(`Agendamento ${JSON.stringify(e)}`);
    }
  });
};
