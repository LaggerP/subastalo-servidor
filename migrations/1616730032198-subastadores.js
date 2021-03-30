'use strict'
const dbConn = require('../database')
const sql = require ('mssql');


module.exports.up = function (next) {
  const sqlQuery = `create table subastadores(
    identificador int not null,
    matricula varchar(15),
    region varchar(50),
    constraint pk_subastadores primary key (identificador),
    constraint fk_subastadores_personas foreign key (identificador) references personas
  )`;

 
  dbConn.migrate(sqlQuery, next);
}

module.exports.down = function (next) {
  next()
}
