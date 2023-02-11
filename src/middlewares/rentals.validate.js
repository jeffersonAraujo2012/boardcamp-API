import rentalSchema from '../schemas/rental.schema.js';
import db from '../services/database.js';

export default async function rentalsValidate(req, res, next) {
  const newRental = req.body;
  const validateResult = rentalSchema.validate(newRental, {
    abortEarly: false,
  });
  const resultCustomer = await db.query(
    'SELECT * FROM customers WHERE id = $1',
    [newRental?.customerId]
  );
  const resultGame = await db.query('SELECT * FROM games WHERE id = $1', [
    newRental?.gameId,
  ]);

  if (resultCustomer.rowCount === 0 || resultGame.rowCount === 0) {
    return res.sendStatus(400);
  }

  if (validateResult.error) {
    return res.status(400).send(validateResult.error.details);
  }

  next();
}
