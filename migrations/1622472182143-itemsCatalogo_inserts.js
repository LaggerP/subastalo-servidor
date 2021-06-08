'use strict'
const dbConn = require('../database');

module.exports.up = function (next) {
  const sqlQuery = `
INSERT INTO itemsCatalogo (catalogo, producto, precioBase, comision, subastado)
VALUES (1,1,10000,1,'no'),
       (1,2,15000,1,'no'),
       (2,3,9000,1,'no'),
       (2,3,9000,1,'no');
`

  dbConn.migrate(sqlQuery, next);
}

module.exports.down = function (next) {
  next()
}


