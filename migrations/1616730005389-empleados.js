'use strict'
const dbConn = require('../database')

module.exports.up = function (next) {
  const sqlQuery = `create table empleados(
    identificador int not null,
    cargo varchar(100),
    sector int null,
    constraint pk_empleados primary key (identificador)
  )`;

  dbConn.migrate(sqlQuery, next);
}

module.exports.down = function (next) {
  next()
}
