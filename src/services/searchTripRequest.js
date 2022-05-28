import * as queryHelper from '../helpers/queryHelper';

const searchByDestination = async (destinationKey, userRole, userId) => {
  const results = await queryHelper.byDestination(
    destinationKey,
    userRole,
    userId
  );
  if (!results || results.length === 0) {
    return null;
  }
  return results;
};

const searchByDeparture = async (departureKey, userId, role) => {
  const results = await queryHelper.byDeparture(departureKey, userId, role);
  if (!results || results.length === 0) {
    return null;
  }
  return results;
};

const searchByStatus = async (keyStatus, userRole, userId) => {
  const results = await queryHelper.byStatus(keyStatus, userId, userRole);
  if (!results || results.length === 0) {
    return null;
  }
  return results;
};

const searchByDepartureDestination = async (
  departure,
  destination,
  userId,
  userRole
) => {
  const results = await queryHelper.byDepartureAndDestination(
    departure,
    destination,
    userId,
    userRole
  );
  if (!results || results.length === 0) {
    return null;
  }
  return results;
};

export {
  searchByDestination,
  searchByDeparture,
  searchByStatus,
  searchByDepartureDestination,
};
