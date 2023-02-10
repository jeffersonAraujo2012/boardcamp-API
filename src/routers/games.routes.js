import express from 'express';
import getGames from '../controllers/getGames.controller.js';
import postGames from '../controllers/postGames.controller.js';
import postGamesValidate from '../middlewares/postGames.validate.js';
const gamesRouter = express.Router();

gamesRouter.get('/', getGames);
gamesRouter.post('/', postGamesValidate, postGames);

export default gamesRouter;
