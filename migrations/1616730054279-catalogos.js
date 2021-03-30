'use strict'
const dbConn = require('../database')
const sql = require ('mssql');


module.exports.up = function (next) {
  const sqlQuery = `create table catalogos(
    identificador int not null identity,
    descripcion varchar(250) not null,
    subasta int null,
    responsable int not null,
    constraint pk_catalogos primary key (identificador),
    constraint fk_catalogos_empleados foreign key (responsable) references empleados(identificador),
    constraint fk_catalogos_subastas foreign key (subasta) references subastas(identificador),
  )`;

 
  dbConn.migrate(sqlQuery, next);
}

module.exports.down = function (next) {
  next()
}
