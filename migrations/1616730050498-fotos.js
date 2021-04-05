'use strict'
const dbConn = require('../database')


module.exports.up = function (next) {
  const sqlQuery = `create table fotos(
    identificador int not null identity,
    producto int not null,
    foto varbinary (max) not null,
    constraint pk_fotos primary key (identificador),
    constraint fk_fotos_productos foreign key (producto) references productos(identificador)
  )`;

  dbConn.migrate(sqlQuery, next);
}

module.exports.down = function (next) {
  next()
}
