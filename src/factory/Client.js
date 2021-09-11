import {buildSalonObject} from './Salon';

export const buildClientObject = client => {
  return {
    id: client.objectId,
    bornDate: client.Aniversario,
    tel: client.Telefone,
    tel2: client.Telefone2,
    cpf: client.CPF,
    // salon: buildSalonObject(client.IdSalaoFK),
    name: client.Nome,
    email: client.Email,
  };
};
