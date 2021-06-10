'use strict'
const dbConn = require('../database');

module.exports.up = function (next) {
  const sqlQuery = `
  INSERT INTO catalogos (descripcion, subasta, responsable)
  VALUES ('Catalogo compuesto por juego de té inglés del siglo XX en excelente estado', 1, 1),
         ('Equipamiento deportivo de la Selección Argentina de fútbol', 2, 1),
         ('Vehículos clásicos de mediados del siglo XX', 3 ,1),
         ('Ropa de famosos', 4 ,1),
         ('Obras de arte', 5 ,1),
         ('Reliquias militares', 6 ,1);
`

  dbConn.migrate(sqlQuery, next);
}

module.exports.down = function (next) {
  next()
}


