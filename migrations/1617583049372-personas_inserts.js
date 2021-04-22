'use strict'
const dbConn = require('../database');
const bcrypt = require ('bcrypt');

module.exports.up = function (next) {

  const sqlQuery = `INSERT INTO personas
  (documento, nombre, direccion, estado, foto)
  VALUES
  ('12345678', 'Empleado Gimenez', 'Avenida Siempre Viva 123', 'activo', convert(varbinary,'1010101')),
  ('12312312', 'Comun Gimenez', 'Avenida Independencia 223', 'activo', convert(varbinary,'1010101')),
  ('1111', 'Especial Mate', 'Avenida Amarga 123', 'activo', convert(varbinary,'1010101')),
  ('12212', 'Plata Mate', 'Avenida Amarga 123', 'activo', convert(varbinary,'1010101')),
  ('222222', 'Oro Mate', 'Avenida Amarga 123', 'activo', convert(varbinary,'1010101')),
  ('33333', 'Platino Mate', 'Avenida Amarga 123', 'activo', convert(varbinary,'1010101'))`;

  dbConn.migrate(sqlQuery, next);

}

module.exports.down = function (next) {
  next()
}
