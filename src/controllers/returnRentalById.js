import dayjs from 'dayjs';
import db from '../services/database.js';

export default async function returnRentalById(req, res) {
  const rentalId = req.params.id;

  try {
    const resultQuery = await db.query('SELECT * FROM rentals WHERE id = $1', [
      rentalId,
    ]);

    if (resultQuery.rowCount === 0) {
      return res.status(404).send('Aluguel não existe.');
    }
    if (resultQuery.rows[0]?.returnDate !== null) {
      return res.status(400).send('Aluguel já finalizado.');
    }

    const pricePerDay = await db.query(
      'SELECT "pricePerDay" FROM games WHERE id = $1',
      [resultQuery.gameId]
    );

    const rentDate = dayjs(resultQuery.rentDate);
    const returnDate = dayjs();
    const originalReturnDate = rentDate.add(resultQuery.daysRented, 'day');
    const diff = returnDate.diff(originalReturnDate, 'day');

    const delayFee = diff > 0 ? pricePerDay * diff : 0;

    await db.query(
      'UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3',
      [returnDate.format('YYYY-MM-DD'), delayFee, rentalId]
    );

    res.sendStatus(200);
  } catch (error) {
    res
      .status(500)
      .send('Algo de errado ocorreu ao finalizar o aluguel: ' + error.message);
  }
}
