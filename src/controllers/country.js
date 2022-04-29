import CountryService from '../services/country.service';
import ErrorResponse from '../utils/errorResponse';

export default class CountryController {
  static addCountry = async (req, res) => {
    try {
      const country = await CountryService.create(req.body);
      return res.json({ message: 'Country added', country });
    } catch (error) {
      return ErrorResponse.internalServerError(res, error.message);
    }
  };

  static getAllCountries = async (req, res) => {
    try {
      const countries = await CountryService.getAllCountries();
      return res.json(countries);
    } catch (error) {
      return ErrorResponse.internalServerError(res, error.message);
    }
  };
}
