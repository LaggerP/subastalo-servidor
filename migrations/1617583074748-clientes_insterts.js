'use strict'
const dbConn = require('../database');

module.exports.up = function (next) {

  const sqlQuery = `INSERT INTO clientes (identificador, numeroPais, admitido, categoria, verificador) VALUES
  (2,1,'si','comun',1),
  (3,2,'si','especial',1),
  (4,3,'si','plata',1),
  (5,4,'si','oro',1),
  (6,5,'si','platino',1)
  `

  dbConn.migrate(sqlQuery, next);

}

module.exports.down = function (next) {
  next()
}
