export const buildSalonObject = salon => {
  return {
    id: salon.objectId,
    employeQt: salon.QuantidadeFunc,
    cnpj: salon.CNPJ,
    name: salon.Nome,
  };
};
