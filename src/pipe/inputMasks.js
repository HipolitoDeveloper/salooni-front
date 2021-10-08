export const maskCPF = value => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

export const maskPhone = value => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d{4})(\d)/, '$1-$2');
};

export const maskCEP = value => {
  return value.replace(/\D/g, '').replace(/^(\d{5})(\d{3})+?$/, '$1-$2');
};
export const maskDate = value => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1');
};

export const maskCNPJ = value => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{2})(\d+?)$/, '$1');
};

export const maskBRL = value => {
  let newValor = value + '';
  newValor = parseInt(newValor.replace(/[\D]+/g, ''));
  newValor = newValor + '';
  newValor = newValor.replace(/([0-9]{2})$/g, ',$1');

  if (newValor.length > 6) {
    newValor = newValor.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2');
  }

  if (newValor === 'NaN') newValor = '';
  return newValor;
};
