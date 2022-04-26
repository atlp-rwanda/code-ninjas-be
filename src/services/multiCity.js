import models from '../database/models';

const { TripRequest } = models;

class multiCityRequest {
  static createMultiCityRequest = async (mapped) => {
    const thisTrip = await TripRequest.bulkCreate(mapped);
    return thisTrip;
  };
}

export default multiCityRequest;
