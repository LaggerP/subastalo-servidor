'use strict'
const dbConn = require('../database');
const bcrypt = require('bcrypt');


module.exports.up = function (next) {
  const sqlQuery = `
INSERT INTO tarjeta (cliente, nombreTitular, entidad, numero, vencimiento, codigo, lastNumbers)
VALUES (2, 'Comun Gimenez', 'bbva', '4432432123412233','12/26', '${bcrypt.hashSync('234', parseInt(process.env.BCRYPT_ROUNDS, 10))}', '2233'),
       (2, 'Comun Gimenez', 'galicia', '5422292112413343','09/24', '${bcrypt.hashSync('123', parseInt(process.env.BCRYPT_ROUNDS, 10))}', '3343'),
       (3, 'Especial Mate', 'santander', '5268056461681601','08/24', '${bcrypt.hashSync('202', parseInt(process.env.BCRYPT_ROUNDS, 10))}', '1601'),
       (4, 'Plata Mate', 'itau', '5319944180621702','10/24', '${bcrypt.hashSync('451', parseInt(process.env.BCRYPT_ROUNDS, 10))}', '1702'),
       (5, 'Oro Mate', 'bbva', '4716062118980942','08/24', '${bcrypt.hashSync('123', parseInt(process.env.BCRYPT_ROUNDS, 10))}', '0942'),
       (6, 'Platino Mate', 'santander', '4539417060265897','09/24', '${bcrypt.hashSync('665', parseInt(process.env.BCRYPT_ROUNDS, 10))}', '5897')
`;

  dbConn.migrate(sqlQuery, next);
}

module.exports.down = function (next) {
  next()
}
