import dayjs from 'dayjs';
import db from '../services/database.js';

export default async function getCustomers(req, res) {
  try {
    const customers = await db.query('SELECT * FROM customers');
    customers.rows = customers.rows.map((customer) => {
      customer.birthday = dayjs(customer.birthday).format("YYYY-MM-DD");
      return customer;
    })
    res.status(200).send(customers.rows);
  } catch (error) {
    res
      .status(500)
      .send('Erro interno ao solicitar lista de jogos: ' + error.message);
  }
}
