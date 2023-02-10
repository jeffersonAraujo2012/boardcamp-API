import db from '../services/database.js';

export default async function getCustomersById(req, res) {
  const id = Math.floor(Number(req.params.id));

  if (isNaN(id)) return res.sendStatus(404);

  try {
    const games = await db.query('SELECT * FROM customers WHERE id = $1', [id]);

    if (games.rows.length === 0) return res.sendStatus(404);

    res.status(200).send(games.rows);
  } catch (error) {
    res
      .status(500)
      .send('Erro interno ao solicitar lista de jogos: ' + error.message);
  }
}
