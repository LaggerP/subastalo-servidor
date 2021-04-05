'use strict'
const dbConn = require('../database')

module.exports.up = function (next) {
  const sqlQuery = `create table sectores(
    identificador int not null identity,
    nombreSector varchar(150) not null,
    codigoSector varchar(10) null,
    responsableSector int null,
    constraint pk_sectores primary key (identificador),
    constraint fk_sectores_empleados foreign key (responsableSector) references empleados
  )`;

  dbConn.migrate(sqlQuery, next);
}

module.exports.down = function (next) {
  next()
}
