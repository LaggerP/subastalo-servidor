'use strict'
const dbConn = require('../database');

module.exports.up = function (next) {
  const sqlQuery = `
  INSERT INTO catalogos (descripcion, subasta, responsable)
  VALUES ('Catalogo compuesto por juego de té', 1, 1),
         ('Equipamiento deportivo', 2, 1),
         ('Accesorios vehiculares', 3 ,1),
         ('Ropa de famosos', 4 ,1),
         ('Obras de arte', 5 ,1),
         ('Reliquias militares', 6 ,1);
`

  dbConn.migrate(sqlQuery, next);
}

module.exports.down = function (next) {
  next()
}


