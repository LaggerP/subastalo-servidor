'use strict'
const dbConn = require('../database')
const sql = require ('mssql');

module.exports.up = function (next) {
  const sqlQuery = `create table paises(
    numero int not null,
    nombre varchar(250) not null,
    nombreCorto varchar(250) null,
    capital varchar(250) not null,
    nacionalidad varchar(250) not null,
    idiomas varchar(150) not null,
    constraint pk_paises primary key (numero)
  )`;


  dbConn.migrate(sqlQuery, next);

}

module.exports.down = function (next) {
  next()
}