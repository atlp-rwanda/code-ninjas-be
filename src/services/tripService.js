/* eslint-disable import/prefer-default-export */
import { Op } from 'sequelize';
import models from '../database/models';

const { TripRequest, Accommodation, Users } = models;

export const countTrips = async (userId, start, end, userRole) => {
  try {
    if (userRole === 1) {
      const trips = await TripRequest.findAndCountAll({
        where: {
          [Op.and]: [
            { requesterId: userId },
            { createdAt: { [Op.between]: [start, end] } },
            { status: 'approved' },
          ],
        },
      });
      return trips;
    }
    if (userRole === 2) {
      const accomodation = await models.Accommodation.findAll({
        where: { managerId: userId },
      });
      const ids = accomodation.map((accom) => accom.id);
      if (!ids.length) {
        return { count: 0 };
      }
      const trips = await TripRequest.findAndCountAll({
        where: {
          accomodationId: {
            [Op.or]: ids,
          },
          createdAt: { [Op.between]: [start, end] },
          status: 'approved',
        },
      });
      return trips;
    }
  } catch (error) {
    return { error };
  }
};
