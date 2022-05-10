/* eslint-disable import/no-duplicates */
import { sequelize } from '../database/models';
import models from '../database/models';

const byDeparture = async (departure, user, userRole) => {
  const search = departure.toLowerCase();
  if (userRole === 2) {
    const results = await models.TripRequest.findAll({
      where: { departure_place: search },
      include: [
        { model: models.User, where: { id: user }, as: 'manager' },
        {
          model: models.Accommodation,
        },
      ],
    });
    return results;
  }

  if (userRole === 1) {
    const results = await models.TripRequest.findAll({
      where: { departure_place: search },
      include: [
        { model: models.User, where: { id: user }, as: 'requester' },
        {
          model: models.Accommodation,
        },
      ],
    });
    return results;
  }

  if (userRole === 3) {
    const results = await models.TripRequest.findAll({
      where: { departure_place: search },
      include: [
        { model: models.User, as: 'requester' },
        { model: models.User, as: 'manager' },
        { model: models.Accommodation },
      ],
    });
    return results;
  }
};

const byStatus = async (statusKey, user, userRole) => {
  const search = statusKey.toLowerCase();
  if (userRole === 2) {
    const results = await models.TripRequest.findAll({
      where: { status: search },
      include: [
        { model: models.User, where: { id: user }, as: 'manager' },
        { model: models.Accommodation },
      ],
    });
    return results;
  }

  if (userRole === 1) {
    const results = await models.TripRequest.findAll({
      where: { status: search },
      include: [
        { model: models.User, where: { id: user }, as: 'requester' },
        { model: models.Accommodation },
      ],
    });
    return results;
  }

  if (userRole === 3) {
    const results = await models.TripRequest.findAll({
      where: { status: search },
      include: [
        { model: models.User, where: { id: user }, as: 'requester' },
        { model: models.User, where: { id: user }, as: 'manager' },
        { model: models.Accommodation },
      ],
    });
    return results;
  }
};

const byDepartureAndDestination = async (
  origin,
  destination,
  user,
  userRole
) => {
  const searchOne = origin.toLowerCase();
  const searchTwo = destination.toLowerCase();
  if (userRole === 2) {
    const results = await models.TripRequest.findAll({
      where: { departure_place: searchOne, destination: searchTwo },
      include: [
        { model: models.User, where: { id: user }, as: 'manager' },
        {
          model: models.Accommodation,
        },
      ],
    });
    return results;
  }
  if (userRole === 1) {
    const results = await models.TripRequest.findAll({
      where: { departure_place: searchOne, destination: searchTwo },
      include: [
        { model: models.User, where: { id: user }, as: 'requester' },
        {
          model: models.Accommodation,
        },
      ],
    });
    return results;
  }

  if (userRole === 3) {
    const results = await models.TripRequest.findAll({
      where: { departure_place: searchOne, destination: searchTwo },
      include: [
        { model: models.User, where: { id: user }, as: 'requester' },
        { model: models.User, where: { id: user }, as: 'manager' },
        {
          model: models.Accommodation,
        },
      ],
    });
    return results;
  }
};

const byDestination = async (destination, userRole, user) => {
  const search = destination.toLowerCase();
  if (userRole === 3) {
    const results = await models.TripRequest.findAll({
      where: { destination: search },
      include: [
        { model: models.User, as: 'manager' },
        { model: models.User, as: 'requester' },
        { model: models.Accommodation },
      ],
    });
    return results;
  }
  if (userRole === 2) {
    const results = await models.TripRequest.findAll({
      where: { destination: search },
      include: [
        { model: models.User, as: 'manager' },
        { model: models.Accommodation },
      ],
    });
    return results;
  }
  if (userRole === 1) {
    const results = await models.TripRequest.findAll({
      where: { destination: search },
      include: [
        { model: models.User, as: 'requester' },
        { model: models.Accommodation },
      ],
    });
    return results;
  }
};

export { byDeparture, byStatus, byDepartureAndDestination, byDestination };
