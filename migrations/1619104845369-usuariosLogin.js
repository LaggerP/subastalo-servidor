'use strict'
const dbConn = require('../database');

module.exports.up = function (next) {
  const sqlQuery = `create table usuariosLogin(
    identificador int not null identity,
    email varchar(50) not null,
    password varchar(60) not null,
    constraint pk_usuariosLogin primary key (identificador),
    constraint fk_usuarisoLogin_personas foreign key (identificador) references personas
  )`;

  dbConn.migrate(sqlQuery, next);

};

module.exports.down = function (next) {
  next()
}
