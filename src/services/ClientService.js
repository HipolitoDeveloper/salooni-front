import Parse from 'parse/react-native';
import {convertToObj} from '../pipe/conversor';
import {SalonObject} from './SalonService';
import {buildClientList, buildClientObject} from '../factory/Client';
import {deleteScheduleByClientId} from './ScheduleService';

export const ClientObject = Parse.Object.extend('client');

export const insertClientCRUD = (clientObj, returnParseObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {name, email, cpf, tel, tel2, bornDate, salonId} = clientObj;

      const client = new ClientObject();
      client.set('name', name);
      client.set('email', email);
      client.set('cpf', cpf);
      client.set('tel', tel);
      client.set('tel2', tel2);
      client.set('birthdate', bornDate);
      client.set('salon_id', new SalonObject({objectId: salonId}));
      if (returnParseObject) {
        resolve(await client.save());
      } else {
        resolve(buildClientObject(convertToObj(await client.save())));
      }
    } catch (e) {
      console.error(`Cliente ${JSON.stringify(e)}`);
      reject(`Cliente ${JSON.stringify(e)}`);
    }
  });
};

export const updateClientCRUD = (clientObj, returnParseObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {name, email, cpf, tel, tel2, bornDate, id} = clientObj;

      const client = new ClientObject({objectId: id});

      client.set('name', name);
      client.set('email', email);
      client.set('cpf', cpf);
      client.set('tel', tel);
      client.set('tel2', tel2);
      client.set('birthdate', bornDate);

      if (returnParseObject) {
        resolve(await client.save());
      } else {
        resolve(buildClientObject(convertToObj(await client.save())));
      }
    } catch (e) {
      console.error(`Cliente ${e}`);
      reject(`Cliente ${JSON.stringify(e)}`);
    }
  });
};

export const getAllClientsBySalonId = (salonId, returnParseObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      const ClientQuery = new Parse.Query(ClientObject);
      ClientQuery.equalTo('salon_id', new SalonObject({objectId: salonId}));
      if (returnParseObject) {
        resolve(await ClientQuery.find());
      } else {
        const clients = await ClientQuery.find();
        if (clients.length > 0) resolve(buildClientList(convertToObj(clients)));
        else resolve([]);
      }
    } catch (e) {
      console.error(`Cliente ${e}`);
      reject(`Cliente ${JSON.stringify(e)}`);
    }
  });
};
export const deleteClientCRUD = (clientId, returnParseObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      const client = new ClientObject({objectId: clientId});

      client.destroy().then(async deletedClient => {
        await deleteScheduleByClientId(clientId, false);
        if (returnParseObject) {
          resolve(deletedClient);
        } else {
          resolve(buildClientObject(convertToObj(deletedClient)));
        }
      });
    } catch (e) {
      console.error(`Cliente ${e}`);
      reject(`Cliente ${JSON.stringify(e)}`);
    }
  });
};
