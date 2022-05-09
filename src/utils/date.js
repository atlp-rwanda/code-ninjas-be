export default (input) => {
  const date = new Date(input);
  const dateValue = date.getTime() + Math.abs(date.getTimezoneOffset() * 60000);
  return new Date(dateValue).toISOString().split('T')[0];
};
