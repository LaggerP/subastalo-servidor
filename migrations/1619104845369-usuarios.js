'use strict'
const dbConn = require('../database');

module.exports.up = function (next) {
  const sqlQuery = `create table usuarios(
    identificador int not null,
    email varchar(50) not null,
    password varchar(60) not null,
    primerInicio bit not null,
    constraint pk_usuarios primary key (identificador),
    constraint fk_usuarios_personas foreign key (identificador) references personas
  )`;

  dbConn.migrate(sqlQuery, next);

};

module.exports.down = function (next) {
  next()
}
