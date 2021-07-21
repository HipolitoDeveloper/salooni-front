export const convertToObj = (parseObject) => {
  return JSON.parse(JSON.stringify(parseObject));
};

export const convertFromAsyncStorage = (asyncObject) => {
  console.log(asyncObject);
  return JSON.parse(asyncObject);
};
