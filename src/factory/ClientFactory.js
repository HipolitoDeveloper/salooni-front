export const buildClientObject = client => {
  return {
    id: client.objectId,
    birthDate: client.birthdate,
    tel: client.tel,
    tel2: client.tel2,
    cpf: client.cpf,
    // salon: buildSalonObject(client.IdSalaoFK),
    name: client.name,
    email: client.email,
  };
};

export const buildClientList = clients => {
  return clients.map(client => {
    return {
      id: client.objectId,
      birthDate: client.birthdate,
      tel: client.tel,
      tel2: client.tel2,
      cpf: client.cpf,
      // salon: buildSalonObject(client.IdSalaoFK),
      name: client.name,
      email: client.email,
    };
  });
};
