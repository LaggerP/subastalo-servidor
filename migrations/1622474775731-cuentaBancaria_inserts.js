'use strict'
const dbConn = require('../database');
const bcrypt = require('bcrypt');


module.exports.up = function (next) {
  const sqlQuery = `
  INSERT INTO cuentaBancaria (cliente, cbu_alias, nombreTitular, entidad) 
  VALUES (2, 'PEPE.RIGOBERTO.SANTO', 'Comun Gimenez', 'bbva'),
         (3, 'PEPE.RIGOBERTO.SANTO', 'Comun Gimenez', 'bbva'),
         (4, 'SANDRO.PALOMA.DIABLO', 'Especial Mate', 'galicia'),
         (5, 'GAVIOTA.ATOMICA.VEINTE', 'Oro Mate', 'santander'),
         (6, 'PENELOPE.HOTEL.BOTE', 'Platino Mate', 'itau')
`;

  dbConn.migrate(sqlQuery, next);
}

module.exports.down = function (next) {
  next()
}
