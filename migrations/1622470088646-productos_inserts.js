'use strict'
const dbConn = require('../database');

module.exports.up = function (next) {
  const sqlQuery = `
 INSERT INTO productos (fecha, disponible, descripcionCatalogo, descripcionCompleta, revisor, duenio)
  VALUES (GETDATE(), 'si', 'Taza de porcelana estilo inglés','Taza de porcelana estilo inglés del año 1945. En excelente estado.', 1, 2),
         (GETDATE(), 'si', 'Tetera de porcelana estilo inglés','Tetera de porcelana estilo inglés del año 1945. En excelente estado.', 1, 2),
         (GETDATE(), 'si', 'Botines Adidas Predator','Botines Adidas Predator firmados por Messi.', 1, 2),
         (GETDATE(), 'si', 'Camisera Titular Selección Argentina','Camisera Titular Selección Argentina firmada por todo el plantel.', 1, 2),
         (GETDATE(), 'si', 'Ford Mustang Boss 429','Ford Mustang Boss 429 del año 1969 en excelente estado, con repuestos nuevos.', 1, 2),
         (GETDATE(), 'si', 'Chevrolet Camaro ZL1','Chevrolet Camaro ZL1 del año 1969 en excelente estado, con repuestos nuevos.', 1, 2)
`

  dbConn.migrate(sqlQuery, next);
}

module.exports.down = function (next) {
  next()
}


