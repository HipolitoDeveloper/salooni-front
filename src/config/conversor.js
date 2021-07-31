export const convertToObj = parseObject => {
  return JSON.parse(JSON.stringify(parseObject));
};

export const convertFromAsyncStorage = asyncObject => {
  return JSON.parse(asyncObject);
};
