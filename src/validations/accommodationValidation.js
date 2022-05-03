import Joi from 'joi';

const accommodationSchema = Joi.object({
  name: Joi.string().empty().min(3).max(20).messages({
    'any.required': '{{#label}} field is required',
    'string.base': '{{#label}} must be of type string',
    'string.empty': '{{#label}} can not be empty',
  }),
  type: Joi.string().empty().required(),
  description: Joi.string().empty().min(3).messages({
    'any.required': '{{#label}} field is required',
    'string.base': '{{#label}} must be of type string',
    'string.empty': '{{#label}} can not be empty',
  }),
  images: Joi.string(),
  amenities: Joi.array().items(
    Joi.string().empty().min(4).messages({
      'any.required': '{{#label}} field is required',
      'string.base': '{{#label}} must be of type string',
      'string.empty': '{{#label}} can not be empty',
    })
  ),
  geoCoordinates: Joi.object().keys({
    longitude: Joi.number().required(),
    latitude: Joi.number().required(),
  }),
  address: Joi.string().empty().required().messages({
    'any.required': '{{#label}} field is required',
    'string.base': '{{#label}} must be of type string',
    'string.empty': '{{#label}} can not be empty',
    'string.pattern.base':
      '{{#label}} must contain only characters from a to z, numbers and spaces inclusive.',
  }),
  locationId: Joi.number().integer(),
});

class AccommodationValidation {
  static validateNewAccommodation = async (req, res, next) => {
    req.body.amenities = req.body.amenities.split(',');
    req.body.geoCoordinates = JSON.parse(req.body.geoCoordinates);
    const newAccommodation = accommodationSchema.and(
      'name',
      'description',
      'amenities',
      'geoCoordinates',
      'address',
      'locationId'
    );
    const { error } = newAccommodation.validate(req.body);
    if (error) {
      return res.status(422).json({
        error: error.details[0].message.replace(/["'`]+/g, ''),
      });
    }
    next();
  };

  static validateAccommodationUpdate = (req, res, next) => {
    if ('amenities' in req.body) {
      req.body.amenities = req.body.amenities.split(',');
    }
    if ('geoCoordinates' in req.body) {
      req.body.geoCoordinates = JSON.parse(req.body.geoCoordinates);
    }
    const accommodationPatch = accommodationSchema.or(
      'name',
      'description',
      'images',
      'amenities',
      'geoCoordinates',
      'address',
      'locationId'
    );
    const { error } = accommodationPatch.validate(req.body);
    if (error) {
      return res.status(422).json({
        error: error.details[0].message.replace(/["'`]+/g, ''),
      });
    }
    next();
  };
}

export default AccommodationValidation;
