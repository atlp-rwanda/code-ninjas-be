import getDate from '../utils/date';

export const isBeforeToday = (departureDate) => {
  return getDate(departureDate) < getDate(new Date());
};

export const isAfterDepartureDate = (departureDate, returnDate) => {
  return departureDate <= returnDate;
};
