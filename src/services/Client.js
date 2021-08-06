import Parse from 'parse/react-native';
import {convertToObj} from '../common/conversor';
import {getSalonById} from './Salon';

const ClientObject = Parse.Object.extend('Cliente');

export const getClientById = (clientId, returnParseObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      const ClientQuery = new Parse.Query(ClientObject);

      if (returnParseObject) {
        resolve(await ClientQuery.get(clientId));
      } else {
        resolve(convertToObj(await ClientQuery.get(clientId)));
      }
    } catch (e) {
      reject(`Cliente ${JSON.stringify(e)}`);
    }
  });
};

export const insertClient = (clientObj, returnParseObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {name, email, cpf, tel, tel2, born_date, IdSalaoFK} = clientObj;

      const client = new ClientObject();
      client.set('Nome', name);
      client.set('Email', email);
      client.set('CPF', cpf);
      client.set('Telefone', tel);
      client.set('Telefone2', tel2);
      client.set('Aniversario', born_date);
      client.set('IdSalaoFK', IdSalaoFK);
      if (returnParseObject) {
        resolve(await client.save());
      } else {
        resolve(convertToObj(await client.save()));
      }
    } catch (e) {
      reject(`Cliente ${JSON.stringify(e)}`);
    }
  });
};

export const updateClient = (clientObj, returnParseObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {name, email, cpf, tel, born_date, objectId} = clientObj;

      const client = await getClientById(objectId, true);

      client.set('Nome', name);
      client.set('Email', email);
      client.set('CPF', cpf);
      client.set('Telefone', tel);
      client.set('Aniversario', born_date);

      if (returnParseObject) {
        resolve(await client.save());
      } else {
        resolve(convertToObj(await client.save()));
      }
    } catch (e) {
      reject(`Cliente ${JSON.stringify(e)}`);
    }
  });
};

export const getAllClientsBySalonId = (salonId, returnParseObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      const salon = await getSalonById(salonId, true);
      const ClientQuery = new Parse.Query(ClientObject);
      ClientQuery.equalTo('IdSalaoFK', salon);
      if (returnParseObject) {
        resolve(await ClientQuery.find());
      } else {
        resolve(convertToObj(await ClientQuery.find()));
      }
    } catch (e) {
      reject(`Cliente ${JSON.stringify(e)}`);
    }
  });
};
export const deleteClient = (clientId, returnParseObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      const client = await getClientById(clientId, true);
      client.destroy().then(deletedClient => {
        if (returnParseObject) {
          resolve(deletedClient);
        } else {
          resolve(convertToObj(deletedClient));
        }
      });
    } catch (e) {
      reject(`Cliente ${JSON.stringify(e)}`);
    }
  });
};
