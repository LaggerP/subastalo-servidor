'use strict'
const dbConn = require('../database');

module.exports.up = function (next) {

  const sqlQuery = `INSERT INTO sectores (nombreSector, codigoSector, responsableSector) VALUES ('sector administrativo', '1234', 1);`

  dbConn.migrate(sqlQuery, next);

}

module.exports.down = function (next) {
  next()
}
