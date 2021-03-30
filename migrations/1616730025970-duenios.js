'use strict'
const dbConn = require('../database')
const sql = require ('mssql');


module.exports.up = function (next) {
  const sqlQuery = `create table duenios(
    identificador int not null,
    numeroPais int,
    verificacionFinanciera varchar(2) constraint chkVF check(verificacionFinanciera in ('si','no')),
    verificacionJudicial varchar(2) constraint chkVJ check(verificacionJudicial in ('si','no')),
    calificacionRiesgo int constraint chkCR check(calificacionRiesgo in (1,2,3,4,5,6)),
    verificador int not null
    constraint pk_duenios primary key (identificador),
    constraint fk_duenios_personas foreign key (identificador) references personas,
    constraint fk_duenios_empleados foreign key (verificador) references empleados (identificador)
  )`;

  dbConn.migrate(sqlQuery, next);
}

module.exports.down = function (next) {
  next()
}
