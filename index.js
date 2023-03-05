import express from 'express';
import { Sequelize } from 'sequelize';

const app = express();

const coneccion = new Sequelize(
  'noqzptsc',
  'noqzptsc',
  '8lhHeA7fMy8qcyZRbXMNBsNUvngHQYop',
  {
    host: 'queenie.db.elephantsql.com',
    dialect: 'postgres',
  }
);

coneccion
  .authenticate()
  .then(() => {
    console.log('Conectado a la base de datos');
  })
  .catch((err) => {
    console.log('Error al conectar a la base de datos', err);
  });

const users = coneccion.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  lastname: {
    type: Sequelize.STRING,
  },
  age: {
    type: Sequelize.INTEGER,
  },
});

coneccion.sync({ force: false }).then(() => {
  users.create({
    name: 'Pepito',
    lastname: 'UDH',
    age: 58,
  });
});

app.get('/', (req, res) => {
  users.findAll().then((users) => {
    res.json(users);
  });
});

app.listen(8000, () => {
  console.log('Server started on port 3000');
});
