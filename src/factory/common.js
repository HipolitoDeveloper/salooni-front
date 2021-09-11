export const dateConverter = date => {
  const day = date.getDate().toString(),
    fullDay = day.length === 1 ? '0' + day : day,
    month = (date.getMonth() + 1).toString(),
    fullMonth = month.length === 1 ? '0' + month : month,
    fullYear = date.getFullYear();
  return fullDay + '/' + fullMonth + '/' + fullYear;
};

export const buildDropdown = list => {
  return list.map(item => {
    return {
      id: item.objectId,
      item: item.Nome,
    };
  });
};
