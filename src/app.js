import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import gamesRouter from './routers/games.routes.js';
import customersRouter from './routers/customers.routes.js';

const PORT = 5000;
const server = express();
server.use(express.json());
server.use(cors());

server.use('/games', gamesRouter);
server.use('/customers', customersRouter);

server.listen(PORT, (err) => {
  if (err) return console.log('Algo deu errado na inicialização do servidor');
  console.log('Servido ouvindo na porta ' + PORT);
});
