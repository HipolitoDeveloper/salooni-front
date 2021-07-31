import Parse from 'parse/react-native';
import {convertToObj} from '../config/conversor';

const ClientObject = Parse.Object.extend('Cliente');
const ClientQuery = new Parse.Query(ClientObject);

export const insertClient = (clientObj, returnParseObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {name, email, cpf, tel, born_date} = clientObj;

      const client = new ClientObject();
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

export const getAllClients = returnParseObject => {
  return new Promise(async (resolve, reject) => {
    try {
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
