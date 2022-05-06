import Parse from "parse/react-native";
import { SalonObject } from "./SalonService";
 import {deleteSchedulesByClientId, deleteSchedulesByClients, deleteSchedulesByEmployees} from "./ScheduleService";
import { buildClientList, buildClientObject } from "../factory/ClientFactory";
import { convertToObj } from "../common/converters/GenericConverter";
import {EmployeeObject} from "./EmployeeService";

export const ClientObject = Parse.Object.extend("client");

export const saveClientParse = async (client) => {
  const { name, email, cpf, tel, tel2, birthDate, salonId } = client;

  const ParseClient = new ClientObject();
  ParseClient.set("name", name);
  ParseClient.set("email", email);
  ParseClient.set("cpf", cpf);
  ParseClient.set("tel", tel);
  ParseClient.set("tel2", tel2);
  ParseClient.set("birthdate", birthDate?.toString());
  ParseClient.set("salon_id", new SalonObject({ objectId: salonId }));

  try {
    const savedClient = await ParseClient.save();
    return buildClientObject(convertToObj(savedClient));

  } catch (e) {
    throw e;
  }
};

export const updateClientParse = async (client) => {
  const { name, email, cpf, tel, tel2, birthDate, id } = client;

  const ParseClient = new ClientObject({ objectId: id });

  ParseClient.set("name", name);
  ParseClient.set("email", email);
  ParseClient.set("cpf", cpf);
  ParseClient.set("tel", tel);
  ParseClient.set("tel2", tel2);
  ParseClient.set("birthdate", birthDate.toString());

  try {
    const updatedClient = await ParseClient.save();
    return buildClientObject(convertToObj(updatedClient));
  } catch (e) {
    throw e;
  }
};

export const getAllClientsBySalonId = async (salonId) => {
  const ClientQuery = new Parse.Query(ClientObject);
  ClientQuery.equalTo("salon_id", new SalonObject({ objectId: salonId }));

  try {
    const clients = await ClientQuery.find();

    return clients.length ? buildClientList(convertToObj(clients)) : [];

  } catch (e) {
    throw e;
  }
};

export const deleteClientParse = async (clientId) => {
  const client = new ClientObject({ objectId: clientId });

  try {
    const deletedClient = await client.destroy();
    await deleteSchedulesByClientId(clientId, false);

    return buildClientObject(convertToObj(deletedClient));
  } catch (e) {
    throw e;
  }
};

export const deleteClientsParse = async clients => {
  const clientsToDelete = []

  clients.forEach(({id}) => {
    clientsToDelete.push(new ClientObject({ objectId: id }))
  })

  try {
    await deleteSchedulesByClients(clientsToDelete.map(client => {return client.id}));
    await Parse.Object.destroyAll(clientsToDelete);

  } catch (e) {
    throw e;
  }
};
