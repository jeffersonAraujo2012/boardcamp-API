import customerSchema from '../schemas/customer.schema.js';
import db from '../services/database.js';

export default async function customersValidate(req, res, next) {
  const id = req.params?.id;
  const newCustomer = req.body;
  const validateResult = customerSchema.validate(newCustomer, {
    abortEarly: false,
  });
  const resultCustomer = await db.query(
    'SELECT * FROM customers WHERE cpf = $1 AND id <> $2',
    [newCustomer?.cpf, id]
  );

  if (resultCustomer.rows.length > 0) {
    return res.sendStatus(409);
  }

  if (validateResult.error) {
    return res.status(400).send(validateResult.error.details);
  }

  next();
}
