'use strict'
const dbConn = require('../database');

module.exports.up = function (next) {

  const sqlQuery = `INSERT INTO subastadores (identificador, matricula, region) VALUES (1, 1111, null)`

  dbConn.migrate(sqlQuery, next);

}

module.exports.down = function (next) {
  next()
}