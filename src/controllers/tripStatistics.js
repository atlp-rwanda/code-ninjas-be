import { countTrips } from '../services/tripService';
import successResponse from '../utils/successResponse';

export const tripStatistics = async (req, res) => {
  const userId = req.user.id;
  const { start } = req.query;
  let { end } = req.query;
  const endingDate = end;
  const isToday =
    new Date(end).toLocaleDateString() === new Date().toLocaleDateString();
  if (isToday) {
    end = new Date();
  } else {
    end = new Date(end);
    end.setDate(end.getDate() + 1);
  }

  const userRole = req.roleId;
  if (userRole !== 1 && userRole !== 2) {
    return res
      .status(403)
      .json('Statistics of travel are available for requester and Manager');
  }
  const trips = await countTrips(userId, start, end, userRole);
  console.log('trips', trips);
  if (trips.count !== undefined) {
    return successResponse(res, 200, {
      status: `You succesfully got all trips you have made between ${start} and ${endingDate} succesfully`,
      trips: trips.count,
    });
  }
  return res.status(500).json(`${trips.error}`);
};
export const recentTripStatistic = async (req, res) => {
  const userId = req.user.id;
  let { period } = req.query;
  const { number } = req.query;
  period = period.toLowerCase();
  const end = new Date();
  const start = new Date();
  if (period === 'week' || period === 'weeks') {
    start.setDate(start.getDate() - 7 * number);
  } else if (period === 'day' || period === 'days') {
    start.setDate(start.getDate() - number);
  } else if (period === 'month' || period === 'months') {
    start.setMonth(start.getMonth() - number);
  } else if (period === 'year' || period === 'years') {
    start.setYear(start.getYear() - number);
  } else {
    return res.status(401).json('Put valid period');
  }
  const userRole = await req.roleId;
  if (userRole !== 1 && userRole !== 2) {
    return res
      .status(403)
      .json('Statistics of travel are available for requester and Manager');
  }
  const trips = await countTrips(userId, start, end, userRole);
  if (trips.count !== undefined) {
    return successResponse(res, 200, {
      status: `You succesfully got all trips you made ${number} ${period} ago`,
      trips: trips.count,
    });
  }
  return res.status(500).json(`${trips.error}`);
};
