'use strict'
const dbConn = require('../database');

module.exports.up = function (next) {
  const sqlQuery = `
INSERT INTO itemsCatalogo (catalogo, producto, precioBase, comision, subastado)
VALUES (1,1,1000,1,'no'),
       (1,2,2000,1,'no');
`

  dbConn.migrate(sqlQuery, next);
}

module.exports.down = function (next) {
  next()
}


