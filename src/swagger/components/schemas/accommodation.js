export default {
  Accommodation: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
      },
      type: {
        type: 'string',
        enum: [
          'Hotel',
          'Motel',
          'Apartment',
          'Resort',
          'Boutique',
          'Bed & Breakfast',
          'Lodge',
          'Guest house',
        ],
      },
      description: {
        type: 'string',
      },
      images: {
        type: 'array',
        items: { type: 'string', format: 'binary' },
        maxItems: 5,
      },
      amenities: {
        type: 'array',
        items: { type: 'string' },
      },
      geoCoordinates: {
        type: 'object',
        properties: {
          longitude: { type: 'number' },
          latitude: { type: 'number' },
        },
      },
      address: {
        type: 'string',
      },
      locationId: {
        type: 'integer',
      },
    },
  },
};
