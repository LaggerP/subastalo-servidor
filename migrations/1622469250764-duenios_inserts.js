'use strict'
const dbConn = require('../database');

module.exports.up = function (next) {
  const sqlQuery = `
  INSERT INTO duenios (identificador, numeroPais, verificacionFinanciera, verificacionJudicial, calificacionRiesgo, verificador)
  VALUES (2, 1, 'si', 'si', 1, 1),
         (3, 1, 'si', 'si', 2, 1),
         (4, 1, 'si', 'no', 3, 1),
         (5, 1, 'no', 'si', 4, 1),
         (6, 1, 'no', 'no', 5, 1)
`

  dbConn.migrate(sqlQuery, next);
}

module.exports.down = function (next) {
  next()
}


