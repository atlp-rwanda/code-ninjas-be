import { Accommodation, Room } from '../database/models';

class AccommodationServices {
  static createAccommodation = async (data) => {
    return Accommodation.create(data);
  };

  static getOneAccommodation = async (id) => {
    const oneAccommodation = await Accommodation.findOne({
      where: { id },
      include: [
        {
          model: Room,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    return oneAccommodation;
  };

  static getAccommodationsByLocation = async (locationId) => {
    const accommodations = await Accommodation.findAll({
      where: { locationId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    return accommodations;
  };

  static updateAccommodation = async (id, updates) => {
    const updatedAccommodation = await Accommodation.update(updates, {
      where: { id },
      returning: true,
      raw: true,
    });
    return updatedAccommodation;
  };

  static getAllAccommodations = async () => {
    return Accommodation.findAll({});
  };

  static deleteAccommodation = async (id) => {
    return Accommodation.destroy({
      where: { id },
    });
  };
}

export default AccommodationServices;
