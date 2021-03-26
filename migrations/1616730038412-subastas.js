'use strict'
const dbConnection = require('../database')
const sql = require ('mssql');


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

 
  sql.connect(dbConnection, (err) => {
    if (err) console.log(err);

    console.log('Connection to DB established');

    let request = new sql.Request();
    request.query(sqlQuery, (err, result) => {
      if (err)
        console.log(err);
      else
        next(); console.log(result)
    })

  });
}

module.exports.down = function (next) {
  next()
}
