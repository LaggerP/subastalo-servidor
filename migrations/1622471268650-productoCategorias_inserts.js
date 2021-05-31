'use strict'
const dbConn = require('../database');

module.exports.up = function (next) {
  const sqlQuery = `
INSERT INTO productoCategorias (producto, categoria)
VALUES (1, 6),
       (2, 6);
`

  dbConn.migrate(sqlQuery, next);
}

module.exports.down = function (next) {
  next()
}


