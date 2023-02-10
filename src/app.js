import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import gamesRouter from './routers/games.routes.js';

const server = express();
server.use(express.json());
server.use(cors());

server.use('/games', gamesRouter);

server.listen(4000, (err) => {
  if (err) return console.log('Algo deu errado na inicialização do servidor');
  console.log('Servido ouvindo na porta ' + 4000);
});
