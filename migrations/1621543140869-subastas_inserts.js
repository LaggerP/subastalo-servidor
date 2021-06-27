'use strict'
const dbConn = require('../database');

module.exports.up = function (next) {
  const sqlQuery = `
INSERT INTO subastalo.dbo.subastas (fecha, hora, estado, subastador, ubicacion, capacidadAsistentes, tieneDeposito, seguridadPropia, categoria) VALUES 
(GETDATE(), CONVERT (TIME, DATEADD(HOUR, -3, GETDATE())), 'abierta', 1, 1, 1000, 'si', 'si', 'Oro'),
(DATEADD(day, 15, GETDATE()), '14:00:00', 'abierta', 1, 1, 1000, 'si', 'si', 'Comun'),
(GETDATE(), CONVERT (TIME, DATEADD(HOUR, -3, GETDATE())), 'abierta', 1, '1', 1000, 'si', 'si', 'Platino'),
(DATEADD(day, 25, GETDATE()), '08:00:00', 'abierta', 1, '1', 1000, 'si', 'si', 'Especial'),
(DATEADD(day, 13, GETDATE()), '13:30:00', 'abierta', 1, '1', 1000, 'si', 'si', 'Platino'),
(DATEADD(day, 22, GETDATE()), '12:30:00', 'abierta', 1, '1', 1000, 'si', 'si', 'Oro');
`

  dbConn.migrate(sqlQuery, next);
}

module.exports.down = function (next) {
  next()
}


