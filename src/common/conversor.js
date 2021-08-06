export const convertToObj = parseObject => {
  return JSON.parse(JSON.stringify(parseObject));
};

export const convertFromAsyncStorage = asyncObject => {
  return JSON.parse(asyncObject);
};

export const ClientParseObjectToClientObject = clientParseObject => {
  const clientObject = {
    name: clientParseObject.Nome,
    email: clientParseObject.Email,
    cpf: clientParseObject.CPF,
    tel: clientParseObject.Telefone,
    born_date: clientParseObject.Aniversario,
    objectId: clientParseObject.objectId,
  };

  return clientObject;
};
