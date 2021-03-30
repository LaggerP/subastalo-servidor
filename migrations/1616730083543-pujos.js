'use strict'
const dbConn = require('../database')
const sql = require ('mssql');


module.exports.up = function (next) {
  const sqlQuery = `create table pujos(
    identificador int not null identity,
    asistente int not null,
    item int not null,
    importe decimal(18,2) not null constraint chkI check (importe > 0.01),
    ganador varchar(2) constraint chkG check (ganador in ('si','no')) default 'no',
    constraint pk_pujos primary key (identificador),
    constraint fk_pujos_asistentes foreign key (asistente) references asistentes,
    constraint fk_pujos_itemsCatalogo foreign key (item) references itemsCatalogo
  )`;

  
  dbConn.migrate(sqlQuery, next);
}

module.exports.down = function (next) {
  next()
}
