export const convertToObj = parseObject => {
  return JSON.parse(JSON.stringify(parseObject));
};

export const convertFromAsyncStorage = asyncObject => {
  return JSON.parse(asyncObject);
};

export const ClientParseObjectToClientObject = clientParseObject => {
  return {
    name: clientParseObject.Nome,
    email: clientParseObject.Email,
    cpf: clientParseObject.CPF,
    tel: clientParseObject.Telefone,
    born_date: clientParseObject.Aniversario,
    objectId: clientParseObject.objectId,
  };
};

export const PartnerParseObjectToPartnerObject = partnerParseObject => {
  return {
    name: partnerParseObject.Nome,
    email: partnerParseObject.Email,
    cnpj: partnerParseObject.CNPJ,
    tel: partnerParseObject.Telefone,
    objectId: partnerParseObject.objectId,
  };
};

export const ProcedureParseObjectToProcedureObject = procedureParseObject => {
  return {
    name: procedureParseObject.Nome,
    objectId: procedureParseObject.objectId,
    time: procedureParseObject.Tempo,
    price: `$${procedureParseObject.Valor.toString()}`,

    percentage:
      procedureParseObject.ComissaoPorcentagem !== 0
        ? `%${procedureParseObject.ComissaoPorcentagem}`
        : 0,
    isPercentage: procedureParseObject.ComissaoPorcentagem !== 0,
    fixedValue:
      procedureParseObject.ComissaoValor !== 0
        ? `$${procedureParseObject.ComissaoValor}`
        : 0,
    isFixedValue: procedureParseObject.ComissaoValor !== 0,
  };
};
