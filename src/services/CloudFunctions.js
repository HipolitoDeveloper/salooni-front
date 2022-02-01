import Parse from 'parse/react-native';
import { ScheduleObject } from './ScheduleService';
import { ScheduleProcedureObject } from './ScheduleProcedureService'
import { SalonObject } from './SalonService';
import { convertToObj } from "../pipe/conversor";
import moment from 'moment';
import { reject } from 'lodash';

export const verifyInformationBeforeInsertion = params => {
  return new Promise(async (resolve, reject) => {
    const { partners, owner } = params;
    const newPartners = [];
    const verifications = [];
    partners.forEach(partner => {
      if (partner.email === owner.email) {
        verifications.push({
          message:
            'Não foi possível concluir o cadastro pois o e-mail do Proprietário e Parceiro são iguais.',
          item: partner,
          property: 'email',
          type: partner.employeeType,
        });
      }

      if (partner.cnpj === owner.cnpj) {
        verifications.push({
          message:
            'Não foi possível concluir o cadastro pois o CNPJ do Proprietário e Parceiro são iguais.',
          item: partner,
          property: 'cnpj',
          type: partner.employeeType,
        });
      }
    });

    if (verifications.length > 0) {
      resolve(verifications);
    }

    newPartners.push(
      {
        cnpj: owner.cnpj,
        email: owner.email,
        name: owner.userName,
        tel: owner.tel,
        employeeType: 'OWN',
      },
      ...partners,
    );

    const salon = {
      name: owner.salonName,
      cnpj: owner.cnpj,
    };

    try {
      const params = {
        salon: salon,
        partners: newPartners,
      };
      let resultObject = await Parse.Cloud.run('verifyInformation', params);
      resolve(resultObject);
    } catch (error) {
      reject(error);
    }
  });
};

export const getFinanceInformation = async (salonId) => {
  try {
    const params = {
      salonId: salonId
    }

    let resultObject = await Parse.Cloud.run('getFinanceInformation', params);
    return resultObject
  } catch (error) {
    console.error(error)
  }

  // return { finances: finances, totalSalonFinances: totalSalonFinances, totalPartnerFinances: totalPartnerFinances }

}





