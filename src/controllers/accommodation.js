import AccommodationService from '../services/accommodation.service';
import cloudinary from '../config/cloudinary';
import LocationService from '../services/location.service';
import ErrorResponse from '../utils/errorResponse';

class AccommodationController {
  static createAccommodation = async (req, res, next) => {
    try {
      const location = await LocationService.getSingleLocation(
        req.body.locationId
      );
      if (!location) {
        return ErrorResponse.notFoundError(res, 'Location not found');
      }
      if ('files' in req) {
        const pictures = req.files;
        const urls = [];
        const uploadImages = pictures.map((image) =>
          cloudinary.uploader.upload(image.path, { folder: 'barefoot_api' })
        );
        const imageResponse = await Promise.all(uploadImages);
        imageResponse.forEach((image) => {
          return urls.push(image.url);
        });
        req.body = {
          ...req.body,
          images: urls,
        };
      }

      const createdAccommodation =
        await AccommodationService.createAccommodation(req.body);
      return res.status(201).json({
        status: '201',
        message: 'Accommodation added successfully',
        payload: createdAccommodation,
      });
    } catch (err) {
      ErrorResponse.internalServerError(res, err.message);
    }
  };

  static getOneAccommodation = async (req, res, next) => {
    try {
      const { accommodationId } = req.params;
      const accommodation = await AccommodationService.getOneAccommodation(
        accommodationId
      );
      if (!accommodation) {
        return res.status(404).json({
          status: '404',
          message: 'Accommodation not found',
        });
      }
      return res.status(200).json({
        status: '200',
        message: 'Accommodation found',
        payload: accommodation,
      });
    } catch (err) {
      ErrorResponse.internalServerError(res, err.message);
    }
  };

  static getAccommodationsByLocation = async (req, res, next) => {
    try {
      const { locationId } = req.params;
      const location = await LocationService.getSingleLocation(locationId);
      if (!location) {
        return ErrorResponse.notFoundError(res, 'Location not found');
      }
      const accommodations =
        await AccommodationService.getAccommodationsByLocation(locationId);
      res.status(200).json({
        status: 200,
        message: 'These are the accommodations in specified location',
        payload: accommodations,
      });
    } catch (err) {
      ErrorResponse.internalServerError(res, err.message);
    }
  };

  static getAllAccommodations = async (req, res, next) => {
    try {
      const accommodations = await AccommodationService.getAllAccommodations();
      res.status(200).json({
        status: 200,
        message: 'These are all the accommodations',
        payload: accommodations,
      });
    } catch (err) {
      ErrorResponse.internalServerError(res, err.message);
    }
  };

  static updateAccommodation = async (req, res, next) => {
    try {
      const { accommodationId } = req.params;
      const accommodation = await AccommodationService.getOneAccommodation(
        accommodationId
      );
      if (!accommodation) {
        return res.status(404).json({
          status: '404',
          message: 'Accommodation not found',
        });
      }

      if ('files' in req) {
        const imagesURLs = [];
        const uploadImages = req.files.map((image) =>
          cloudinary.uploader.upload(image.path, { folder: 'barefoot_api' })
        );
        const imageResponse = await Promise.all(uploadImages);
        imageResponse.forEach((image) => {
          return imagesURLs.push(image.url);
        });

        req.body = {
          ...req.body,
          images:
            imagesURLs.length > 0 ? imagesURLs : accommodationToUpdate.images,
        };
      }

      await accommodation.update(req.body);

      res.status(200).json({
        status: 200,
        message: 'accommodation updated successfully',
        payload: updatedAccommodation,
      });
    } catch (err) {
      ErrorResponse.internalServerError(res, err.message);
    }
  };

  static getAllRooms = async (req, res) => {
    try {
      const accommodation = await AccommodationService.getOneAccommodation(
        req.params.accommodationId
      );
      const rooms = await accommodation.getRooms();
      res.json(rooms);
    } catch (error) {
      ErrorResponse.internalServerError(res, error.message);
    }
  };

  static deleteAccommodation = async (req, res, next) => {
    try {
      const { accommodationId } = req.params;
      const accommodation = await AccommodationService.getOneAccommodation(
        accommodationId
      );
      if (!accommodation) {
        return res.status(404).json({
          status: '404',
          message: 'Accommodation not found',
        });
      }

      const deletedAccommodation =
        await AccommodationService.deleteAccommodation(
          req.params.accommodationId
        );
      res.status(200).json({
        status: 200,
        message: 'accommodation deleted successfully',
        payload: deletedAccommodation,
      });
    } catch (err) {
      ErrorResponse.internalServerError(res, err.message);
    }
  };

  static updateLike = async (req, res) => {
    try {
      const accommodation = await AccommodationService.findAccommodation({
        id: req.params.id,
      });
      if (!accommodation) {
        return ErrorResponse.notFoundError(res, 'Accommodation not found');
      }

      const { like } = await AccommodationService.findUserAccommodationLike(
        req.params.id,
        req.user.id
      );

      if (like) {
        await accommodation.addUser(req.user, {
          through: { like: null },
        });
        return res.status(200).json({ message: 'Like removed' });
      }

      await accommodation.addUser(req.user, {
        through: { like: true },
      });
      return res.status(200).json({ message: 'Like added' });
    } catch (error) {
      ErrorResponse.internalServerError(res, error.message);
    }
  };

  static getLikes = async (req, res) => {
    try {
      const likes = await AccommodationService.countLikes(req.params.id);
      res.status(200).json(likes);
    } catch (error) {
      ErrorResponse.internalServerError(res, error.message);
    }
  };
}

export default AccommodationController;
