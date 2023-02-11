import express from 'express';
import getRentals from '../controllers/getRentals.controller.js';
import postCustomers from '../controllers/postCustomers.controller.js';
import rentalsValidate from '../middlewares/rentals.validate.js';
const rentalsRouter = express.Router();

rentalsRouter.get('/', getRentals);
rentalsRouter.post('/', rentalsValidate, postCustomers);

export default rentalsRouter;