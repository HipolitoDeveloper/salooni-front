import Parse from 'parse/react-native';
import {convertToObj} from '../common/conversor';

const CommissionObject = Parse.Object.extend('Comissao');
const CommissionQuery = new Parse.Query(CommissionObject);

export const saveCommission = (commissionObj, returnParseObject) => {
  return new Promise((resolve, reject) => {
    try {
      const {percentage, value} = commissionObj;

      const newCommission = new CommissionObject();
      newCommission.set('ComissaoPorcentagem', parseInt(percentage));
      newCommission.set('ComissaoValor', parseInt(value));

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
      reject(`Comissão ${JSON.stringify(e)}`);
    }
  });
};
