import db from '../services/database.js';

export default async function putCustomersById(req, res) {
  const { name, cpf, phone, birthday } = req.body;
  const id = Math.floor(Number(req.params.id));

  if (isNaN(id)) return res.sendStatus(400);

  try {
    const customer = await db.query(
      'UPDATE customers SET name = $1, cpf = $2, phone = $3, birthday = $4 WHERE id = $5',
      [name, cpf, phone, birthday, id]
    );

    res.sendStatus(200);
  } catch (error) {
    res
      .status(500)
      .send(
        'Erro interno ao solicitar atualização dos dados de usuário: ' +
          error.message
      );
  }
}
