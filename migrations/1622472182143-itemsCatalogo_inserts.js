'use strict'
const dbConn = require('../database');

module.exports.up = function (next) {
  const sqlQuery = `
INSERT INTO itemsCatalogo (catalogo, producto, precioBase, comision, subastado)
VALUES (1,1,12000,1,'no'),
       (1,2,15000,1,'no'),
       (2,3,10000,1,'no'),
       (2,4,9000,1,'no'),
       (3,5,100000,1,'no'),
       (3,6,100000,1,'no');
`

  dbConn.migrate(sqlQuery, next);
}

module.exports.down = function (next) {
  next()
}


