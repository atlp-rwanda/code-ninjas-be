import {
  Accommodation,
  Room,
  Sequelize,
  UserAccommodation,
} from '../database/models';

class AccommodationService {
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

  static findAccommodation = async (searchParams) => {
    return Accommodation.findOne({ where: searchParams });
  };

  static findUserAccommodationLike = async (accommodationId, userId) => {
    return (
      (await UserAccommodation.findOne({
        where: { userId, accommodationId },
      })) || { like: null }
    );
  };

  static countLikes = async (accommodationId) => {
    return UserAccommodation.findOne({
      where: { accommodationId, like: true },
      attributes: [[Sequelize.fn('count', Sequelize.col('like')), 'likes']],
    });
  };
}

export default AccommodationService;
