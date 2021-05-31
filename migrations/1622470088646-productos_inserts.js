'use strict'
const dbConn = require('../database');

module.exports.up = function (next) {
  const sqlQuery = `
 INSERT INTO productos (fecha, disponible, descripcionCatalogo, descripcionCompleta, revisor, duenio)
  VALUES (GETDATE(), 'si', 'Taza de porcelana estilo inglés',
          'Taza de porcelana estilo inglés del año 1945. En excelente estado', 1, 2),
         (GETDATE(), 'si', 'Tetera de porcelana estilo inglés',
          'Tetera de porcelana estilo inglés del año 1945. En excelente estado', 1, 2)
`

  dbConn.migrate(sqlQuery, next);
}

module.exports.down = function (next) {
  next()
}


