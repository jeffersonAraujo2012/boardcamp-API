import db from '../services/database.js';

export default async function postCustomers(req, res) {
  const { name, cpf, phone, birthday } = req.body;

  try {
    const queryResult = await db.query({
      text: 'INSERT INTO customers (name, cpf, phone, birthday) VALUES ($1, $2, $3, $4)',
      values: [name, cpf, phone, birthday],
    });

    if (queryResult.rowCount === 0) {
      throw 'Usuário não criado, contate o desenvolvedor.';
    }

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send('Erro interno ao criar novo usuário: ' + error.message);
  }
}