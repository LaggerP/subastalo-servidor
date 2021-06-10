'use strict'
const dbConn = require('../database')

module.exports.up = function (next) {
  const sqlQuery = `
      create table categorias
        (
          identificador int          not null identity,
          categoria     varchar(64)  not null,
          constraint pk_categorias primary key (identificador),
        )`;

  dbConn.migrate(sqlQuery, next);
}

module.exports.down = function (next) {
  next()
}
