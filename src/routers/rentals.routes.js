import express from 'express';
import deleteRentalById from '../controllers/deleteRentalById.js';
import getRentals from '../controllers/getRentals.controller.js';
import postRentals from '../controllers/postRentals.controller.js';
import returnRentalById from '../controllers/returnRentalById.js';
import rentalsValidate from '../middlewares/rentals.validate.js';
import rentAvailable from '../middlewares/rentAvailable.js';

const rentalsRouter = express.Router();

rentalsRouter.get('/', getRentals);

rentalsRouter.post('/', rentalsValidate, rentAvailable, postRentals);
rentalsRouter.post('/:id/return', returnRentalById);

rentalsRouter.delete('/:id', deleteRentalById);

export default rentalsRouter;
