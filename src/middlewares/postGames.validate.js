import gameSchema from '../schemas/games.schema.js';
import db from '../services/database.js';

export default async function postGamesValidate(req, res, next) {
  const newGame = req.body;
  const validateResult = gameSchema.validate(newGame, { abortEarly: false });
  const resultGame = await db.query('SELECT * FROM games WHERE name = $1', [
    newGame?.name,
  ]);

  if (resultGame.rows.length > 0) {
    return res.sendStatus(409);
  }

  if (validateResult.error) {
    return res.status(400).send(validateResult.error.details);
  }

  next();
}
