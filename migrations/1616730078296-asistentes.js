'use strict'
const dbConn = require('../database')


module.exports.up = function (next) {
  const sqlQuery = `create table asistentes(
    identificador int not null identity,
    numeroPostor int not null,
    cliente int not null,
    subasta int not null
    constraint pk_asistentes primary key (identificador),
    constraint fk_asistentes_clientes foreign key (cliente) references clientes,
    constraint fk_asistentes_subasta foreign key (subasta) references subastas
  )`;


  dbConn.migrate(sqlQuery, next);
}

module.exports.down = function (next) {
  next()
}
