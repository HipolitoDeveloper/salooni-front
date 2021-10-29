export const convertUserToProfileObject = user => {
  return {
    salon: {
      id: user.idSalon,
      name: user.salonName,
      cnpj: user.cnpj,
    },
    user: {
      id: user.id,
      username: user.userName,
      email: user.email,
      password: user.password,
    },
    employee: {
      id: user.idFunc,
      name: user.userName,
      email: user.email,
      cnpj: user.cnpj,
      procedures: [],
    },
  };
};
