'use strict'
const dbConn = require('../database')

module.exports.up = function (next) {
  const sqlQuery = `
      create table productoSeguimiento
        (
          identificador int          not null identity,
          producto      int          not null,
          estado        varchar(10)  constraint chkEST check (estado in ('aceptado','rechazado','pendiente'))
          constraint pk_productoSeguimiento primary key (identificador),
          constraint fk_productoSeguimiento_productos foreign key (producto) references productos,
        )`;

  dbConn.migrate(sqlQuery, next);
}

module.exports.down = function (next) {
  next()
}
