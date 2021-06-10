'use strict'
const dbConn = require('../database');

module.exports.up = function (next) {

  const sqlQuery = `INSERT INTO categorias (categoria) VALUES
  ('Antigüedades'),
  ('Indumentaria'),
  ('Accesorios Vehiculares y Vehículos'),
  ('Joyería'),
  ('Deportes'),
  ('Bazar'),
  ('Otros')
  `

  dbConn.migrate(sqlQuery, next);

}

module.exports.down = function (next) {
  next()
}