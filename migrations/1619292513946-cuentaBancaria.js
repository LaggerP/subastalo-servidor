'use strict'
const dbConn = require('../database')


module.exports.up = function (next) {
  const sqlQuery = `create table cuentaBancaria(
    identificador int not null identity,
    cliente int not null,
    cbu_alias varchar(128) not null,
    nombreTitular varchar(150) not null,
    entidad varchar(150) not null,
    constraint pk_clienteMetodo primary key (identificador),
    constraint fk_cuentaBancaria_clientes foreign key (cliente) references clientes,
  )`;

 
  dbConn.migrate(sqlQuery, next);
}

module.exports.down = function (next) {
  next()
}
