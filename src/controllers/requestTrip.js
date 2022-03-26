import models from '../database/models';
const User = models.User;
const TripRequest = models.TripRequest;

class tripController {
    static requestAtrip = async(req, res) => {
        let user = req.user;

        const {
            managerId,
            departure_place,
            destination,
            departureDate,
            returnDate,
            travel_reason,
            accomodationId,
            status,
        } = req.body;
        const newTripRequest = {
            requesterId: user.user.id,
            managerId: managerId,
            departure_place: departure_place,
            destination: destination,
            departureDate: departureDate,
            returnDate: returnDate,
            travel_reason: travel_reason,
            accomodationId: accomodationId,
            status: status,
        };
        TripRequest.create(newTripRequest).then((data) => {
            res.send(data);
        });
    };
}

export default tripController;