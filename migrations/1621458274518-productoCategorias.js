'use strict'
const dbConn = require('../database')

module.exports.up = function (next) {
  const sqlQuery = `
      create table productoCategorias
        (
          identificador int          not null identity,
          producto      int          not null,
          categoria     int          not null,
          constraint pk_productoCategorias primary key (identificador),
          constraint fk_productoCategorias_productos foreign key (producto) references productos,
          constraint fk_productoCategorias_categorias foreign key (categoria) references categorias,
        )`;

  dbConn.migrate(sqlQuery, next);
}

module.exports.down = function (next) {
  next()
}
