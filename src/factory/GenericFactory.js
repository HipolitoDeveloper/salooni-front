export const buildDropdown = list => {
  return list.map(item => {
    return {
      id: item.objectId,
      item: item.Nome,
    };
  });
};
