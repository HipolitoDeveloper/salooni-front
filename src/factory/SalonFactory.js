export const buildSalonObject = salon => {
  return {
    id: salon.objectId,
    employeQt: salon.employee_qt,
    cnpj: salon.cnpj,
    name: salon.name,
  };
};
