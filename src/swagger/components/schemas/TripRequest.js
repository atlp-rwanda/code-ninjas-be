const TripRequestSchema = {
  TripRequest: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The auto-generated id of the trip request',
      },
      requesterId: {
        type: 'integer',
        description: 'The id of the user who created the trip request',
      },
      managerId: {
        type: 'integer',
        description: 'id of direct manager',
      },
      departure_place: {
        type: 'integer',
        description: 'id of departure place',
      },
      destination: {
        type: 'integer',
        description: 'id of destination',
      },
      departureDate: {
        type: 'dateonly',
        description: 'date of departure',
      },
      returnDate: {
        type: 'dateonly',
        description: 'date of return',
      },
      travel_reason: {
        type: 'string',
        description: 'reason for travel',
      },
      accommodationId: {
        type: 'integer',
        description: 'id of accommodation',
      },
      status: {
        type: 'ENUM',
      },
    },
  },
};
export default TripRequestSchema;
