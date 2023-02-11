import express from 'express';
import getRentals from '../controllers/getRentals.controller.js';
import postRentals from '../controllers/postRentals.controller.js';
import rentalsValidate from '../middlewares/rentals.validate.js';
import rentAvailable from '../middlewares/rentAvailable.js';

const rentalsRouter = express.Router();

rentalsRouter.get('/', getRentals);
rentalsRouter.post('/', rentalsValidate, rentAvailable, postRentals);

export default rentalsRouter;