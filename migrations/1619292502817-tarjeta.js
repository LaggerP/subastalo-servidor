'use strict'
const dbConn = require('../database')


module.exports.up = function (next) {
  const sqlQuery = `create table tarjeta(
    identificador int not null identity,
    cliente int not null,
    nombreTitular varchar(150) not null,
    entidad varchar(150) not null,
    numero varchar(60) not null,
    vencimiento varchar(10) not null,
    codigo varchar(60) not null,
    lastNumbers varchar(4) not null,
    constraint pk_metodoPago primary key (identificador),
    constraint fk_tarjeta_clientes foreign key (cliente) references clientes,
  )`;

 
  dbConn.migrate(sqlQuery, next);
}

module.exports.down = function (next) {
  next()
}
