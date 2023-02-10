import db from '../services/database.js';

export default async function getGames(req, res) {
  try {
    const games = await db.query('SELECT * FROM games');
    res.status(200).send(games.rows);
  } catch (error) {
    res
      .status(500)
      .send('Erro interno ao solicitar lista de jogos: ' + error.message);
  }
}
