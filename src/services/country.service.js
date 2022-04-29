import { Country } from '../database/models';

class CountryService {
  static create = async (data) => {
    return Country.create(data);
  };

  static findCountry = async (params) => {
    return Country.findOne({ where: params });
  };

  static getAllCountries = async () => {
    return Country.findAll();
  };
}

export default CountryService;
