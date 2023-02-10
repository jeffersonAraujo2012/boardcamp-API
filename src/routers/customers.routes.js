import express from 'express';
import getCustomers from '../controllers/getCustomers.controller.js';
import getCustomersById from '../controllers/getCustomersById.controller.js';
import postCustomers from '../controllers/postCustomers.controller.js';
import putCustomersById from '../controllers/putCustomersById.controller.js';
import customersValidate from '../middlewares/customers.validate.js';
const customersRouter = express.Router();

customersRouter.get('/', getCustomers);
customersRouter.get('/:id', getCustomersById);

customersRouter.post('/', customersValidate ,postCustomers);

customersRouter.put('/:id', customersValidate , putCustomersById);

export default customersRouter;
