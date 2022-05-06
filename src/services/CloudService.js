import Parse from "parse/react-native";
import Errors from "../common/Errors";

export const validateInformationBeforeInsert = async params => {
  const { employees, owner } = params;

  const newEmployees = [];
  const verifications = [];
  employees.forEach(employee => {
    if (employee.email === owner.email) {
      verifications.push({
        message:
          "Não foi possível concluir o cadastro pois o e-mail do Proprietário e Parceiro são iguais.",
        item: employee,
        property: "email",
        type: employee.employeeType,
      });
    }

    if (employee.cnpj === owner.cnpj) {
      verifications.push({
        message:
          "Não foi possível concluir o cadastro pois o CNPJ do Proprietário e Parceiro são iguais.",
        item: employee,
        property: "cnpj",
        type: employee.employeeType,
      });
    }
  });

  if (verifications.length > 0) {
    return verifications;
  }

  newEmployees.push(
    {
      cnpj: owner.cnpj,
      email: owner.email,
      name: owner.name,
      tel: owner.tel,
      employeeType: "OWN",
    },
    ...employees,
  );

  const salon = {
    name: owner.salonName,
    cnpj: owner.cnpj,
  };

  try {
    const params = {
      salon: salon,
      employees: newEmployees,
    };

    const validations = await Parse.Cloud.run("verifyInformation", params);

    if(validations.length > 0) throw validations

    return validations;
  } catch (error) {
    throw error;
  }
};

export const getFinanceInformation = async (salonId) => {
  try {
    const params = {
      salonId: salonId,
    };

    return await Parse.Cloud.run("getFinanceInformation", params);
  } catch (error) {
    throw error;
  }

  // return { finances: finances, totalSalonFinances: totalSalonFinances, totalemployeeFinances: totalemployeeFinances }

};

export const verifyBeforeUpdateProfile = async (profile) => {
  try {
    const params = {...profile}

    return await Parse.Cloud.run("verifyBeforeUpdateProfile", params)
  } catch (error) {
    throw error;
  }

}





