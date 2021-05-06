'use strict'
const dbConn = require('../database')

module.exports.up = function (next) {
  const sqlQuery = `
      create table itemsProductos
        (
          identificador int          not null identity,
          producto      int          not null,
          descripcion   varchar(256) not null,
          categoria     varchar(32)  not null,
          constraint pk_itemsProductos primary key (identificador),
          constraint fk_itemsProductos_productos foreign key (producto) references productos,
        )`;

  dbConn.migrate(sqlQuery, next);
}

module.exports.down = function (next) {
  next()
}
