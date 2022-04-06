/* eslint-disable no-restricted-globals */
const isNumber = (num) => {
  const isItNum = isNaN(num);

  if (isItNum) {
    return false;
  }
  return true;
};
export default isNumber;
