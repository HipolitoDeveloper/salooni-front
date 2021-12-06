export const CNPJVerifier = cnpj => {
  let isValid = true;
  cnpj = cnpj.replace(/[^\d]+/g, '');

  if (cnpj == '') isValid = false;

  if (cnpj.length != 14) isValid = false;

  // Elimina CNPJs invalidos conhecidos
  if (
    cnpj == '00000000000000' ||
    cnpj == '11111111111111' ||
    cnpj == '22222222222222' ||
    cnpj == '33333333333333' ||
    cnpj == '44444444444444' ||
    cnpj == '55555555555555' ||
    cnpj == '66666666666666' ||
    cnpj == '77777777777777' ||
    cnpj == '88888888888888' ||
    cnpj == '99999999999999'
  )
    isValid = false;

  // Valida DVs
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(0)) isValid = false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(1)) isValid = false;

  return {
    state: isValid,
    message: isValid ? '' : 'CNPJ digitado não é válido',
  };
};

export const CPFVerifier = cpf => {
  let isValid = true;
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf == '') isValid = false;
  // Elimina CPFs invalidos conhecidos
  if (
    cpf.length != 11 ||
    cpf == '00000000000' ||
    cpf == '11111111111' ||
    cpf == '22222222222' ||
    cpf == '33333333333' ||
    cpf == '44444444444' ||
    cpf == '55555555555' ||
    cpf == '66666666666' ||
    cpf == '77777777777' ||
    cpf == '88888888888' ||
    cpf == '99999999999'
  )
    isValid = false;
  // Valida 1o digito
  let add = 0;
  for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
  let rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) rev = 0;
  if (rev != parseInt(cpf.charAt(9))) isValid = false;
  // Valida 2o digito
  add = 0;
  for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) rev = 0;
  if (rev != parseInt(cpf.charAt(10))) isValid = false;

  return {
    state: isValid,
    message: isValid ? '' : 'CPF digitado não é válido',
  };
};

export const TELVerifier = tel => {
  return {
    state: tel.length >= 12,
    message: tel.length >= 12 ? '' : 'Telefone inválido',
  };
};

export const EMAILVerifier = email => {
  let validator = /\S+@\S+\.\S+/;
  return {
    state: validator.test(email),
    message: validator.test(email) ? '' : 'E-mail inválido',
  };
};

export const PASSVerifier = password => {
  let specialCaracterRegex = /\W|_/;
  let hasUppercase = false;
  let hasLowercase = false;
  let message = [];

  for (let letter of password) {
    let excludeSpecialCaracter = /[A-z]|_+/;
    if (excludeSpecialCaracter.test(letter)) {
      if (letter === letter.toLowerCase()) {
        hasLowercase = true;
      }

      if (letter === letter.toUpperCase()) {
        hasUppercase = true;
      }
    }
  }

  if (!hasUppercase) message.push('*É necessário ao menos uma letra maiúscula');

  if (!hasLowercase) message.push('*É necessário ao menos uma letra minúscula');

  if (password.length < 6)
    message.push('*É necessário de no mínimo 6 caracteres');

  if (!specialCaracterRegex.test(password))
    message.push('*É necessário de ao menos um caracter especial');

  return {
    state:
      password.length >= 6 &&
      specialCaracterRegex.test(password) &&
      hasUppercase &&
      hasLowercase,
    message: message,
  };
};
