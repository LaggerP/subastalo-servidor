'use strict'
const dbConn = require('../database');

module.exports.up = function (next) {
  const sqlQuery = `create table personas(
    identificador int not null identity,
    email varchar(50) not null,
    password varchar(60) not null,
    documento varchar(20) not null,
    nombre varchar(150) not null,
    direccion varchar(250),
    estado varchar(15) constraint chkEstado check (estado in ('activo', 'inactivo')),
    foto varbinary(max)
    constraint pk_personas primary key (identificador)
  )`;

  dbConn.migrate(sqlQuery, next);

};

module.exports.down = function (next) {
  next()
}
