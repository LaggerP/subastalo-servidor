'use strict'
const dbConn = require('../database');
const bcrypt = require ('bcrypt');

module.exports.up = function (next) {

  const sqlQuery = `INSERT INTO personas
  (email, password, documento, nombre, direccion, estado, foto)
  VALUES
  ('empleado@email.com', '${bcrypt.hashSync('empleado', parseInt(process.env.BCRYPT_ROUNDS, 10))}', '12345678', 'Empleado Gimenez', 'Avenida Siempre Viva 123', 'activo', convert(varbinary,'1010101')),
  ('clienteComun@email.com', '${bcrypt.hashSync('comun', parseInt(process.env.BCRYPT_ROUNDS, 10))}', '12312312', 'Comun Gimenez', 'Avenida Independencia 223', 'activo', convert(varbinary,'1010101')),
  ('clienteEspecial@email.com', '${bcrypt.hashSync('especial', parseInt(process.env.BCRYPT_ROUNDS, 10))}', '1111', 'Especial Mate', 'Avenida Amarga 123', 'activo', convert(varbinary,'1010101')),
  ('clientePlata@email.com', '${bcrypt.hashSync('plata', parseInt(process.env.BCRYPT_ROUNDS, 10))}', '12212', 'Plata Mate', 'Avenida Amarga 123', 'activo', convert(varbinary,'1010101')),
  ('clienteOro@email.com', '${bcrypt.hashSync('oro', parseInt(process.env.BCRYPT_ROUNDS, 10))}', '222222', 'Oro Mate', 'Avenida Amarga 123', 'activo', convert(varbinary,'1010101')),
  ('clientePlatino@email.com', '${bcrypt.hashSync('platino', parseInt(process.env.BCRYPT_ROUNDS, 10))}', '33333', 'Platino Mate', 'Avenida Amarga 123', 'activo', convert(varbinary,'1010101'))`;

  dbConn.migrate(sqlQuery, next);

}

module.exports.down = function (next) {
  next()
}
