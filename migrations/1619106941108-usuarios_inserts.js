'use strict'
const dbConn = require('../database');
const bcrypt = require ('bcrypt');

module.exports.up = function (next) {

  const sqlQuery = `INSERT INTO usuarios
  (identificador,email, password, primerInicio)
  VALUES
  (1,'empleado@email.com', '${bcrypt.hashSync('empleado', parseInt(process.env.BCRYPT_ROUNDS, 10))}',0),
  (2,'clienteComun@email.com', '${bcrypt.hashSync('comun', parseInt(process.env.BCRYPT_ROUNDS, 10))}',0),
  (3,'clienteEspecial@email.com', '${bcrypt.hashSync('especial', parseInt(process.env.BCRYPT_ROUNDS, 10))}',0),
  (4,'clientePlata@email.com', '${bcrypt.hashSync('plata', parseInt(process.env.BCRYPT_ROUNDS, 10))}',0),
  (5,'clienteOro@email.com', '${bcrypt.hashSync('oro', parseInt(process.env.BCRYPT_ROUNDS, 10))}',0),
  (6,'clientePlatino@email.com', '${bcrypt.hashSync('platino', parseInt(process.env.BCRYPT_ROUNDS, 10))}',0)`;

  dbConn.migrate(sqlQuery, next);

}

module.exports.down = function (next) {
  next()
}
