'use strict'
const dbConn = require('../database');

module.exports.up = function (next) {
  const sqlQuery = `
INSERT INTO subastalo.dbo.subastas (fecha, hora, estado, subastador, ubicacion, capacidadAsistentes, tieneDeposito, seguridadPropia, categoria) VALUES ('2021-05-31', '15:30:00', 'abierta', 1, 1, 1000, 'si', 'si', 'Platino'),('2021-06-30', '15:30:00', 'abierta', 1, 1, 1000, 'si', 'si', 'Comun'),('2021-06-20', '15:30:00', 'abierta', 1, '1', 1000, 'si', 'si', 'Oro'),('2021-05-31', '15:30:00', 'abierta', 1, '1', 1000, 'si', 'si', 'Especial'),('2021-06-02', '15:30:00', 'abierta', 1, '1', 1000, 'si', 'si', 'Platino'),('2021-07-09', '15:30:00', 'abierta', 1, '1', 1000, 'si', 'si', 'Oro');
`

  dbConn.migrate(sqlQuery, next);
}

module.exports.down = function (next) {
  next()
}


