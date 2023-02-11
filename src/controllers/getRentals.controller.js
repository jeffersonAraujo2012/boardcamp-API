import dayjs from 'dayjs';
import db from '../services/database.js';

export default async function getRentals(req, res) {
  try {
    const rentals = await db.query(
      `SELECT rentals.*, 
      json_build_object('id', customers.id, 'name', customers.name) AS customer, 
      json_build_object('id', games.id, 'name', games.name) AS game FROM rentals 
      JOIN customers ON customers.id = rentals."customerId" 
      JOIN games ON games.id = rentals."gameId";`
    );
    rentals.rows = rentals.rows.map((rental) => {
      rental.rentDate = dayjs(rental.rentDate).format('YYYY-MM-DD');
      if (rental.returnDate) {
        rental.returnDate = dayjs(rental.returnDate).format('YYYY-MM-DD');
      }
      return rental;
    });
    res.status(200).send(rentals.rows);
  } catch (error) {
    res
      .status(500)
      .send('Erro interno ao solicitar lista de jogos: ' + error.message);
  }
}
