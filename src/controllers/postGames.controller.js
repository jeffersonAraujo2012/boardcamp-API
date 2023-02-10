import db from '../services/database.js';

export default async function postGames(req, res) {
  const { name, image, stockTotal, pricePerDay } = req.body;

  try {
    const queryResult = await db.query({
      text: 'INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4)',
      values: [name, image, stockTotal, pricePerDay],
    });

    if (queryResult.rowCount === 0) {
      throw 'Jogo não criado, contate o desenvolvedor.';
    }

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send('Erro interno ao criar o jogo: ' + error.message);
  }
}
