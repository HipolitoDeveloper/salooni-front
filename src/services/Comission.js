import Parse from 'parse/react-native';
import {convertToObj} from '../config/conversor';

const CommissionObject = Parse.Object.extend('Comissao');
const CommissionQuery = new Parse.Query(CommissionObject);

export const saveComission = (commissionObj, returnParseObject) => {
  return new Promise((resolve, reject) => {
    try {
      const {percentage, value} = commissionObj;

      const newCommission = new CommissionObject();
      newCommission.set('ComissaoPorcentagem', percentage);
      newCommission.set('ComissaoValor', value);

      newCommission.save().then(
        savedCommission => {
          if (returnParseObject) {
            resolve(savedCommission);
          } else {
            resolve(convertToObj(savedCommission));
          }
        },
        error => {
          reject(`Comissão ${JSON.stringify(error)}`);
        },
      );
    } catch (e) {
      console.log('teste');
      reject(`Comissão ${JSON.stringify(e)}`);
    }
  });
};
