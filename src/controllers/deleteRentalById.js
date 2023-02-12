import dayjs from 'dayjs';
import db from '../services/database.js';

export default async function deleteRentalById(req, res) {
  const rentalId = req.params.id;

  try {
    const resultQuery = await db.query('SELECT * FROM rentals WHERE id = $1', [
      rentalId,
    ]);

    if (resultQuery.rowCount === 0) {
      return res.status(404).send('Aluguel não existe.');
    }
    if (resultQuery.rows[0]?.returnDate === null) {
      return res.status(400).send('Aluguel ainda não finalizado.');
    }

    const deleteResult = await db.query('DELETE FROM rentals WHERE id = $1', [
      rentalId,
    ]);

    if (deleteResult.rowCount === 0) {
      return res
        .status(500)
        .send('Algo deu errado na query. Nenhum dado foi deletado.');
    }

    res.sendStatus(200);
  } catch (error) {
    res
      .status(500)
      .send('Algo de errado ocorreu ao finalizar o aluguel: ' + error.message);
  }
}
