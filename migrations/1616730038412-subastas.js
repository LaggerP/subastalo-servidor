'use strict'
const dbConn = require('../database')


module.exports.up = function (next) {
  const sqlQuery = `create table subastas(
    identificador int not null identity,
    fecha date constraint chkFecha check (fecha > dateAdd(dd, 10, getdate())),
    hora time not null,
    estado varchar(10) constraint chkES check (estado in ('abierta','carrada')),
    subastador int null,
    ubicacion varchar(350) null,
    capacidadAsistentes int null,
    tieneDeposito varchar(2) constraint chkTD check(tieneDeposito in ('si','no')),
    seguridadPropia varchar(2) constraint chkSP check(seguridadPropia in ('si','no')),
    categoria varchar(10) constraint chkCS check (categoria in ('comun', 'especial', 'plata', 'oro', 'platino')),
    constraint pk_subastas primary key (identificador),
    constraint fk_subastas_subastadores foreign key (subastador) references subastadores(identificador)
  )`;

 
  dbConn.migrate(sqlQuery, next);
}

module.exports.down = function (next) {
  next()
}
