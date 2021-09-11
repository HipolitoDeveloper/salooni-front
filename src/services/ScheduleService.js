import Parse from 'parse/react-native';
import {convertToObj} from '../common/conversor';
import {getEmployeeById} from './EmployeeService';
import {buildScheduleList} from '../factory/Schedule';

const ScheduleObject = Parse.Object.extend('Agendamento');

export const getAllSchedulesByEmployeeId = (employeeId, returnParseObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      const idFunc = await getEmployeeById(employeeId, true);

      const ScheduleQuery = new Parse.Query(ScheduleObject);
      ScheduleQuery.include('IdClienteFK');
      ScheduleQuery.equalTo('IdFuncFK', idFunc);

      if (returnParseObject) {
        resolve(await ScheduleQuery.find());
      } else {
        resolve(buildScheduleList(convertToObj(await ScheduleQuery.find())));
      }
    } catch (e) {
      reject(`Agendamento ${JSON.stringify(e)}`);
    }
  });
};

export const insertScheduleCRUD = (scheduleObj, returnParseObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {IdFuncFK, IdClientFK, procedures} = scheduleObj;

      const schedule = new ScheduleObject();
      // schedule.set('IdFuncFK', IdFuncFK);
      // schedule.set('IdClienteFK', IdClientFK);

      // if (returnParseObject) {
      //   resolve(await schedule.save());
      // } else {
      //   resolve(convertToObj(await schedule.save()));
      // }
    } catch (e) {
      reject(`Agendamento ${JSON.stringify(e)}`);
    }
  });
};
