import { Router } from 'express';
import { verifyAuth, checkAdmin } from '../middlewares';
import CountryCountroller from '../controllers/country';

const router = new Router();

router.post('/', verifyAuth, checkAdmin, CountryCountroller.addCountry);
router.get('/', CountryCountroller.getAllCountries);

export default router;
