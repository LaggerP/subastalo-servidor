'use strict'
const dbConn = require('../database')

module.exports.up = function (next) {
  const sqlQuery = `create table horarioItemPuja(
    identificador int not null identity,
    puja int not null,
    horario datetime,
    constraint pk_horarioItemPuja primary key (identificador),
    constraint fk_horarioItemPuja_puja foreign key (puja) references pujos(identificador),
  )`;

  dbConn.migrate(sqlQuery, next);
}

module.exports.down = function (next) {
  next()
}
