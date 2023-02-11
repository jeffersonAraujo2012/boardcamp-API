import db from '../services/database.js';

export default async function rentAvailable(req, res, next) {
  const result = await db.query(
    `
    SELECT rentals.*, games."stockTotal" FROM rentals WHERE gameId = $1
    JOIN games ON id = $1
  `,
    [req.body.gameId]
  );

  if (result.rowCount >= result.rows[0].stockTotal) {
    res.status(400).send('Estoque insuficiênte.');
  }

  next();
}
