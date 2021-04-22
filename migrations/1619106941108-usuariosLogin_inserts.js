'use strict'
const dbConn = require('../database');
const bcrypt = require ('bcrypt');

module.exports.up = function (next) {

  const sqlQuery = `INSERT INTO usuariosLogin
  (email, password)
  VALUES
  ('empleado@email.com', '${bcrypt.hashSync('empleado', parseInt(process.env.BCRYPT_ROUNDS, 10))}'),
  ('clienteComun@email.com', '${bcrypt.hashSync('comun', parseInt(process.env.BCRYPT_ROUNDS, 10))}'),
  ('clienteEspecial@email.com', '${bcrypt.hashSync('especial', parseInt(process.env.BCRYPT_ROUNDS, 10))}'),
  ('clientePlata@email.com', '${bcrypt.hashSync('plata', parseInt(process.env.BCRYPT_ROUNDS, 10))}'),
  ('clienteOro@email.com', '${bcrypt.hashSync('oro', parseInt(process.env.BCRYPT_ROUNDS, 10))}'),
  ('clientePlatino@email.com', '${bcrypt.hashSync('platino', parseInt(process.env.BCRYPT_ROUNDS, 10))}')`;

  dbConn.migrate(sqlQuery, next);

}

module.exports.down = function (next) {
  next()
}
