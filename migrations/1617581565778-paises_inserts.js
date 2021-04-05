'use strict'
const dbConn = require('../database');

module.exports.up = function (next) {

  const sqlQuery = `
  INSERT INTO paises (numero, nombre, nombreCorto, capital, nacionalidad, idiomas) VALUES
  (1,'Argentina','AR','Buenos Aires', 'Argentino', 'Español'),
  (2,'Brasil','BR','Brasilia', 'Brasilero','Portugues'),
  (3,'Chile','CL','Santiago de Chile','Chileno','Español'),
  (4,'Estados Unidos','US','Washington D. C.','Estadounidense', 'Ingles'),
  (5,'Uruguay','UY','Montevideo','Uruguayo','Español');`

  dbConn.migrate(sqlQuery, next);

}

module.exports.down = function (next) {
  next()
}
