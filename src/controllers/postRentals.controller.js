import dayjs from 'dayjs';
import db from '../services/database.js';

export default async function postRentals(req, res) {
  const { customerId, gameId, daysRented } = req.body;

  try {
    const queryResult = await db.query({
      text: `INSERT INTO rentals 
      ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
      VALUES ($1, $2, $3, $4, $5, (SELECT "pricePerDay" * $4 FROM games WHERE id = $2), $6)`,
      values: [customerId, gameId, dayjs().format("YYYY-MM-DD") ,daysRented, null, null],
    });

    if (queryResult.rowCount === 0) {
      throw 'Jogo não criado, contate o desenvolvedor.';
    }

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send('Erro interno ao criar locação: ' + error.message);
  }
}
