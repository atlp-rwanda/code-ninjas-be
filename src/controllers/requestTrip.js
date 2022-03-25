import models from '../database/models';
const User = models.User;
const TripRequest = models.TripRequest;

class tripController {
    static requestAtrip = async(req, res) => {
        let user = req.user;
        res.send(user);
    };
}

export default tripController;