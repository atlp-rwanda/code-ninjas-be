import CountryService from '../services/country.service';
import LocationService from '../services/location.service';
import ErrorResponse from '../utils/errorResponse';

class LocationControllers {
  static createLocation = async (req, res) => {
    try {
      const country = await CountryService.findCountry({
        name: req.body.country,
      });
      if (!country) {
        return ErrorResponse.notFoundError(res, 'Country not available');
      }

      const location = await country.createLocation({ city: req.body.city });

      return res.status(201).json({
        status: 201,
        message: 'Location added successfully',
        payload: location,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  };

  static getSingleLocation = async (req, res) => {
    try {
      const { locationId } = req.params;
      const singleLocation = await LocationService.getSingleLocation(
        locationId
      );

      if (!singleLocation) {
        return res.status(404).json({
          status: 404,
          error: 'location not found',
        });
      }

      return res.status(200).json({
        status: 200,
        message: 'location retrieved successfully',
        payload: singleLocation,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  };

  static getAllLocationsInCountry = async (req, res) => {
    try {
      const country = await CountryService.findCountry({ id: req.params.id });
      if (!country) {
        return ErrorResponse.notFoundError(res, 'Country not available');
      }
      const locations = await country.getLocations();
      res.json(locations);
    } catch (error) {
      ErrorResponse.internalServerError(res, error.message);
    }
  };

  static updateLocation = async (req, res) => {
    try {
      const { locationId } = req.params;
      const location = await LocationService.getSingleLocation(locationId);
      if (!location) {
        return ErrorResponse.notFoundError(res, 'Location not available');
      }

      await location.update(req.body);

      return res.status(200).json({
        status: 200,
        message: 'location updated successfully',
        payload: location,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  };

  static getAccommodations = async (req, res) => {
    try {
      const location = await LocationService.getSingleLocation(
        req.params.locationId
      );
      const accommodations = await location.getAccommodations();
      res.json(accommodations);
    } catch (error) {
      ErrorResponse.internalServerError(res, error.message);
    }
  };

  static deleteLocation = async (req, res) => {
    try {
      const { locationId } = req.params;
      const location = await LocationService.getSingleLocation(locationId);
      if (!location) {
        return ErrorResponse.notFoundError(res, 'Location not available');
      }
      const deletedLocation = await LocationService.deleteLocation(locationId);

      return res.status(200).json({
        status: 200,
        message: 'location deleted successfully',
        payload: deletedLocation,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  };
}

export default LocationControllers;
