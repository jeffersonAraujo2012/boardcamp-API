import db from '../services/database.js';

export default async function rentAvailable(req, res, next) {
  const result = await db.query(
    `
    SELECT rentals.*, games."stockTotal" FROM rentals
    JOIN games ON games.id = $1
    WHERE "gameId" = $1
  `,
    [req.body.gameId]
  );

  if (result.rowCount >= result.rows[0]?.stockTotal) {
    res.status(400).send('Estoque insuficiênte.');
    return;
  }

  next();
}
