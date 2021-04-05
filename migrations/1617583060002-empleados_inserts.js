'use strict'
const dbConn = require('../database');

module.exports.up = function (next) {

  const sqlQuery = `INSERT INTO empleados (identificador, cargo, sector) VALUES (1,'administrativo',1);`

  dbConn.migrate(sqlQuery, next);

}

module.exports.down = function (next) {
  next()
}
