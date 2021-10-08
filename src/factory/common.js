export const toDate = date => {
  let parts = date.split('/');
  return new Date(parts[2], parts[1] - 1, parts[0]);
};

export const buildDropdown = list => {
  return list.map(item => {
    return {
      id: item.objectId,
      item: item.Nome,
    };
  });
};
