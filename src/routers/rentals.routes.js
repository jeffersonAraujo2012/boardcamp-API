import express from 'express';
import getRentals from '../controllers/getRentals.controller.js';
import postRentals from '../controllers/postRentals.controller.js';
import rentalsValidate from '../middlewares/rentals.validate.js';
const rentalsRouter = express.Router();

rentalsRouter.get('/', getRentals);
rentalsRouter.post('/', rentalsValidate, postRentals);

export default rentalsRouter;